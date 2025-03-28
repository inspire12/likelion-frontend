// URL 쿼리에서 roomId와 roomName 가져오기
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');
const roomName = urlParams.get('roomName');
document.getElementById('room-title').innerText = roomName;

// 채팅에 사용할 이름을 prompt로 입력 (빈 값이면 'anonymous')
let username = localStorage.getItem("username");
if (!username) {
    username = prompt("채팅에 사용할 이름을 입력하세요:") || 'anonymous';
    localStorage.setItem("username", username);
}
// const socket = new SockJS('http://223.130.146.213:8083/ws');
const socket = new SockJS('http://localhost:8083/ws?username=' + username);
const stompClient = Stomp.over(socket);

function showMessage(message) {
    console.log(message.body);
    const data = JSON.parse(message.body);
    // 수신된 메시지를 화면에 출력
    if (data.type && data.type.toUpperCase() === 'CHAT') {
        console.info("chat")
        displayMessage(data);
    }
    if (data.type && data.type.toUpperCase() === 'JOIN') {
        console.info("join")
        displayMessage(data);
    }
}

// STOMP 연결 및 구독 (메시지 수신은 '/topic/public' 또는 원하는 토픽)
stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    const subscription = stompClient.subscribe("/topic/public", function(message) {
        showMessage(message);
    });
    const userSubscription = stompClient.subscribe("/user/queue/private", function (message) {
        showMessage(message);
    })

    console.log("subscription: " + subscription);
    // 연결 완료 후 join 메시지(옵션)를 보낼 수 있음
    stompClient.send("/app/chat.addUser", {}, JSON.stringify({
        type: 'JOIN',
        roomId: roomId,
        sender: username
    }));
});

// // 연결 시 join 메시지 전송
// socket.addEventListener('open', () => {
//     socket.send(JSON.stringify({ type: 'join', roomId, username }));
// });
//
// // 연결 시 join 메시지 전송 (roomId와 username 포함)
// socket.addEventListener('open', () => {
//     socket.send(JSON.stringify({ type: 'join', roomId, username }));
// });
//
// socket.addEventListener('message', (event) => {
//     const data = JSON.parse(event.data);
//     if (data.type === 'chat') {
//         displayMessage(data);
//     }
// });

document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value;
    const chatMessage = {
        type: 'CHAT',
        roomId: roomId,
        sender: username,
        content: message
    };
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    input.value = '';
});

function displayMessage(data) {
    console.log("displayMessage 호출됨", data);
    const chatDiv = document.getElementById('chat-messages');
    if (!chatDiv) {
        console.error("chat-messages 요소를 찾을 수 없습니다.");
        return;
    }
    const msgCard = document.createElement('div');
    msgCard.className = 'message';
    // 스타일 구분 (보낸 사람이 현재 사용자와 동일한지 등)
    if (data.sender === username) {
        msgCard.classList.add('my-message');
    } else if (data.sender === 'owner') {
        msgCard.classList.add('owner-message');
    } else {
        msgCard.classList.add('other-message');
    }
    msgCard.innerText = `${data.sender}: ${data.content}`;
    chatDiv.appendChild(msgCard);
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

function leaveRoom() {
    stompClient.send(JSON.stringify({ type: 'leave', roomId }));
    window.location.href = 'index.html';
}
