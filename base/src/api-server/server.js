const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('client'));

const PORT = process.env.PORT || 5000;

// 소켓 관련
app.use(cors());
// 클라이언트가 연결되었을 때 이벤트 처리
io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');

    // 클라이언트로부터 채팅 메시지를 받으면 모두에게 전송
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('사용자가 연결을 종료하였습니다.');
    });
});

// Dummy posts 데이터
const dummyPosts = [
    {
        id: 1,
        username: 'user1',
        imageUrl: 'https://via.placeholder.com/600x400?text=Post+1',
        caption: '첫 번째 포스트 입니다!'
    },
    {
        id: 2,
        username: 'user2',
        imageUrl: 'https://via.placeholder.com/600x400?text=Post+2',
        caption: '두 번째 포스트 입니다!'
    }
    // 추가 dummy 데이터를 원하면 여기에 추가
];

// API 엔드포인트: /api/posts
app.get('/api/posts', (req, res) => {
    res.json(dummyPosts);
});

app.post('/ask', (req, res) => {
    const message = req.body.message;
    // 여기서 메시지를 처리하는 로직을 추가할 수 있습니다.
    // 예를 들어, DB 조회나 외부 API 호출 등.

    // 예제에서는 2초 후에 응답을 보내도록 처리
    setTimeout(() => {
        res.json({ answer: `답변: "${message}" 에 대한 처리 결과입니다.` });
    }, 2000);
});


// 정적 파일 제공: public 폴더의 파일들을 루트 경로에서 제공
app.use(express.static(path.join(__dirname, '../../public')));
// 정적 파일 제공 - src/client 폴더 추가 (JS, CSS 접근 가능하게 설정)
app.use('/src/client', express.static(path.join(__dirname, '../client')));

// 그 외 모든 요청은 index.html로 응답 (싱글 페이지 애플리케이션 처리)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => console.log(`API 서버 및 정적 파일 서버가 포트 ${PORT}에서 실행 중입니다.`));
