const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

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

// 정적 파일 제공: public 폴더의 파일들을 루트 경로에서 제공
app.use(express.static(path.join(__dirname, '../../public')));

// 그 외 모든 요청은 index.html로 응답 (싱글 페이지 애플리케이션 처리)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => console.log(`API 서버 및 정적 파일 서버가 포트 ${PORT}에서 실행 중입니다.`));
