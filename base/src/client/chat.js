// assets/js/chat.js

document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chat-widget');

    // 챗봇 헤더 생성
    const chatHeader = document.createElement('div');
    chatHeader.classList.add('chat-header');

    const chatTitle = document.createElement('span');
    chatTitle.classList.add('chat-title');
    chatTitle.textContent = '고객 문의 챗봇';

    const chatControls = document.createElement('div');
    chatControls.classList.add('chat-controls');

    const minimizeBtn = document.createElement('button');
    minimizeBtn.id = 'minimize-btn';
    minimizeBtn.title = '최소화';
    minimizeBtn.textContent = '_';

    const closeBtn = document.createElement('button');
    closeBtn.id = 'close-btn';
    closeBtn.title = '닫기';
    closeBtn.textContent = 'X';

    chatControls.append(minimizeBtn, closeBtn);
    chatHeader.append(chatTitle, chatControls);

    // 챗봇 본문 생성 (메시지 영역과 입력 영역)
    const chatBody = document.createElement('div');
    chatBody.id = 'chat-body';
    chatBody.classList.add('chat-body');

    // 메시지 영역 생성
    const chatMessages = document.createElement('div');
    chatMessages.id = 'chat-messages';
    chatMessages.classList.add('chat-messages');

    // 초기 봇 메시지 추가 (옵션)
    const initBotMsg = document.createElement('div');
    initBotMsg.classList.add('chat-message', 'bot');
    initBotMsg.textContent = '안녕하세요! 무엇을 도와드릴까요?';
    chatMessages.append(initBotMsg);

    // 입력 영역 생성
    const chatInputArea = document.createElement('div');
    chatInputArea.classList.add('chat-input-area');

    const chatInput = document.createElement('input');
    chatInput.type = 'text';
    chatInput.id = 'chat-input';
    chatInput.placeholder = '메시지를 입력하세요...';

    const sendBtn = document.createElement('button');
    sendBtn.id = 'send-btn';
    sendBtn.textContent = '전송';

    chatInputArea.append(chatInput, sendBtn);
    chatBody.append(chatMessages, chatInputArea);

    // 전체 위젯에 헤더와 본문 추가
    chatWidget.append(chatHeader, chatBody);

    let isMinimized = false;

    // 최소화/확대 토글 이벤트
    minimizeBtn.addEventListener('click', function() {
        isMinimized = !isMinimized;
        if (isMinimized) {
            chatWidget.classList.add('minimized');
            minimizeBtn.textContent = '+';
        } else {
            chatWidget.classList.remove('minimized');
            minimizeBtn.textContent = '_';
        }
    });

    // 위젯 닫기 이벤트
    closeBtn.addEventListener('click', function() {
        chatWidget.style.display = 'none';
    });

    // 메시지 전송 함수
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message !== '') {
            // 사용자 메시지 추가
            const userMessage = document.createElement('div');
            userMessage.classList.add('chat-message');
            userMessage.textContent = message;
            chatMessages.append(userMessage);

            // 입력창 초기화
            chatInput.value = '';

            // placeholder로 "문의를 해결중입니다..." 메시지 추가
            const botMessage = document.createElement('div');
            botMessage.classList.add('chat-message', 'bot');
            botMessage.textContent = '문의를 해결중입니다...';
            chatMessages.append(botMessage);

            // 최신 메시지로 스크롤 이동
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // 일정 시간 후 placeholder 메시지를 실제 답변으로 업데이트
            setTimeout(function() {
                // 실제 답변으로 변경 (여기서는 예시 답변)
                botMessage.textContent = '입력하신 메시지를 확인했습니다.';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    // 전송 버튼 클릭 이벤트
    sendBtn.addEventListener('click', sendMessage);

    // 엔터 키 입력 이벤트
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
