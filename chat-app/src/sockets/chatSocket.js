const WebSocket = require('ws');

const chatClients = {}; // roomId별 WebSocket 연결 관리

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        let currentRoomId = null;
        let currentUser = null;
        ws.on('message', (message) => {
            try {
                const parsed = JSON.parse(message);
                switch(parsed.type) {
                    case 'join':
                        currentRoomId = parsed.roomId;
                        currentUser = parsed.username;
                        if (!chatClients[currentRoomId]) {
                            chatClients[currentRoomId] = new Set();
                        }
                        chatClients[currentRoomId].add(ws);
                        break;
                    case 'chat':
                        if (currentRoomId && chatClients[currentRoomId]) {
                            // 메시지 브로드캐스트 (보낸 사람 포함)
                            chatClients[currentRoomId].forEach(client => {
                                if (client.readyState === WebSocket.OPEN) {
                                    client.send(JSON.stringify({
                                        type: 'chat',
                                        message: parsed.message,
                                        sender: parsed.sender
                                    }));
                                }
                            });
                        }
                        break;
                    case 'leave':
                        if (currentRoomId && chatClients[currentRoomId]) {
                            chatClients[currentRoomId].delete(ws);
                        }
                        currentRoomId = null;
                        break;
                    default:
                        break;
                }
            } catch (err) {
                console.error('메시지 파싱 에러', err);
            }
        });

        ws.on('close', () => {
            if (currentRoomId && chatClients[currentRoomId]) {
                chatClients[currentRoomId].delete(ws);
            }
        });
    });
}

module.exports = { setupWebSocket };
