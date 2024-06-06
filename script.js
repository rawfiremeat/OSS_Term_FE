window.onload = function() {
    setTimeout(function() {
    window.scrollTo(0, 0); // 페이지 로드 시 스크롤을 맨 위로 이동
    }, 100);
};

document.getElementById('badge').addEventListener('click', function() {
    this.classList.add('expanded');
    const body = document.querySelector('.body')
    setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('profile-content').classList.add('active');
        // body.style.background = '#000000';
        body.style.overflow = "scroll";

    }, 1300); 
});

document.addEventListener('scroll', function() {
    var profileCard = document.querySelector('.profile-card');
    var introduction = document.querySelector('#introduction');
    
    // introduction 요소가 화면에 안 보이면 profileCard를 보이게 함
    var rect = introduction.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        profileCard.style.opacity = '0';
        profileCard.style.transform = 'translateY(20px)';
    } else {
        profileCard.style.opacity = '1';
        profileCard.style.transform = 'translateY(0)';
    }
});

const host = "http://127.0.0.1:8000";
async function getComments() {
    try {
        const response = await axios.get('http://localhost:8000/comments');
        const comments = response.data.comments;
        const commentsDiv = document.getElementById('comments');
        commentsDiv.innerHTML = '';
        console.log(comments)
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<strong>${comment.name}:</strong> ${comment.comments}${comment.comments} <span class="created-at">${comment.createdAt}</span> <button class="delete-btn" onclick="deleteComment(${comment.id})">X</button>`;
            console.log(comment.createdAt);
            commentsDiv.appendChild(commentElement);
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

async function postComment(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const commentText = document.getElementById('comment-text').value;
    if (name.trim() && commentText.trim()) { // 값이 있으면
        try {
            await axios.post('http://localhost:8000/comments', {
                id: 0,
                name: name,
                comments: commentText,
                createdAt: 0
            });
            document.getElementById('name').value = '';
            document.getElementById('comment-text').value = '';
            getComments();
        } catch (error) {
            console.error('posting 실패:', error);
        }
    }
}

async function deleteComment(id) {
    try {
        await axios.delete(`http://localhost:8000/comments/${id}`);
        getComments();
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}
document.getElementById('guestbook-form').addEventListener('submit', postComment); // 버튼누를 시 post
window.addEventListener('DOMContentLoaded', function () {
getComments();
});

