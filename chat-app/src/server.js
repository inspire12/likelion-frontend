const express = require('express');
const http = require('http');
const path = require('path');
const apiRoutes = require('./routes/api');
const chatRoutes = require('./routes/chat');
const { setupWebSocket } = require('./sockets/chatSocket');

const app = express();
const server = http.createServer(app);

// 정적 파일 제공 (public 폴더)
app.use(express.static(path.join(__dirname, '../public')));

// JSON 파싱 미들웨어
app.use(express.json());

// API 라우트 (더미 카드 데이터)
app.use('/api', apiRoutes);

// 채팅 관련 라우트
app.use('/chat', chatRoutes);

// WebSocket 서버 설정
setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
