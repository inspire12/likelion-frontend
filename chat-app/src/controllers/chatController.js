// 임시로 채팅방 정보를 메모리에 저장 (향후 DB 적용 가능)
const chatRooms = {};

exports.createChatRoom = (req, res) => {
    const { roomName, owner } = req.body;
    const roomId = Date.now().toString();
    chatRooms[roomId] = {
        roomId,
        roomName,
        owner,
        participants: [],
        messages: []
    };
    res.status(201).json({ roomId, roomName, owner });
};

exports.joinChatRoom = (req, res) => {
    const { roomId, participant } = req.body;
    if (!chatRooms[roomId]) {
        return res.status(404).json({ error: 'Chat room not found' });
    }
    chatRooms[roomId].participants.push(participant);
    res.json({ message: `${participant} joined the room` });
};

exports.leaveChatRoom = (req, res) => {
    const { roomId, participant } = req.body;
    if (!chatRooms[roomId]) {
        return res.status(404).json({ error: 'Chat room not found' });
    }
    chatRooms[roomId].participants = chatRooms[roomId].participants.filter(p => p !== participant);
    res.json({ message: `${participant} left the room` });
};

exports.deleteChatRoom = (req, res) => {
    const roomId = req.params.roomId;
    if (!chatRooms[roomId]) {
        return res.status(404).json({ error: 'Chat room not found' });
    }
    delete chatRooms[roomId];
    res.json({ message: 'Chat room deleted' });
};

exports.getChatRooms = (req, res) => {
    const rooms = Object.values(chatRooms).map(room => ({
        roomId: room.roomId,
        roomName: room.roomName,
        participantCount: room.participants.length
    }));
    res.json(rooms);
};
