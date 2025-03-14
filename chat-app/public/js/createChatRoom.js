document.getElementById('create-room-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const roomName = document.getElementById('roomName').value;
    const owner = document.getElementById('owner').value;

    fetch('/chat/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName, owner })
    })
        .then(res => res.json())
        .then(data => {
            alert(`Chat room created: ${data.roomName}`);
            window.location.href = 'index.html';
        })
        .catch(err => console.error(err));
});
