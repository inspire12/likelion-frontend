const express = require('express');
const http = require('http');
const path = require('path');
const apiRoutes = require('./routes/api');
const chatRoutes = require('./routes/chat');
const netStatus = require('./utils/status');

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


const PORT = process.env.PORT || 3000;

const HOST = netStatus.getInternalIp(); // 172로 시작하는 내부 IP를 가져옴

server.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
