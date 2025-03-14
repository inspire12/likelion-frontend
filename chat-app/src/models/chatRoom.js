class ChatRoom {
    constructor(roomId, roomName, owner) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.owner = owner;
        this.participants = [];
        this.messages = [];
    }
}

module.exports = ChatRoom;
