document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed');

    // 로딩 메시지 표시
    feedContainer.innerHTML = '<p>로딩 중...</p>';

    // API 서버에서 포스트 데이터 fetch
    fetch('/api/posts')
        .then(response => response.json())
        .then(posts => {
            feedContainer.innerHTML = '';

            posts.forEach(post => {
                const postEl = document.createElement('div');
                postEl.className = 'post';

                const imgEl = document.createElement('img');
                imgEl.src = post.imageUrl;
                imgEl.alt = `Post ${post.id}`;
                postEl.appendChild(imgEl);

                const infoEl = document.createElement('div');
                infoEl.className = 'info';
                infoEl.innerHTML = `<strong>${post.username}</strong> ${post.caption}`;
                postEl.appendChild(infoEl);

                feedContainer.appendChild(postEl);
            });
        })
        .catch(error => {
            console.error('포스트 데이터를 가져오는 중 에러 발생:', error);
            feedContainer.innerHTML = '<p>데이터를 불러오는데 실패했습니다.</p>';
        });
});
