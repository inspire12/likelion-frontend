const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// 채팅방 생성
router.post('/create', chatController.createChatRoom);

// 채팅방 입장
router.post('/join', chatController.joinChatRoom);

// 채팅방 퇴장
router.post('/leave', chatController.leaveChatRoom);

// 채팅방 삭제
router.delete('/:roomId', chatController.deleteChatRoom);

// 채팅방 목록 조회
router.get('/rooms', chatController.getChatRooms);

module.exports = router;
