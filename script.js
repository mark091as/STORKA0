let userProfile = {};
let messages = [];
let notifications = [];
let users = []; // لتخزين بيانات المستخدمين
let currentUser = null;

function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function changeTheme() {
    const theme = document.getElementById('themeSelector').value;
    document.body.className = theme;
}

function addPost() {
    const postContent = document.getElementById('newPost').value;
    const postImage = document.getElementById('postImage').files[0];

    if (postContent || postImage) {
        const postsDiv = document.getElementById('posts');
        const newPost = document.createElement('div');
        newPost.classList.add('post');

        const imageElement = postImage ? `<img src="${URL.createObjectURL(postImage)}" alt="صورة المشاركة" style="max-width: 100%;">` : '';
        newPost.innerHTML = `
            <p>${postContent}</p>
            ${imageElement}
            <button onclick="likePost(this)">أعجبني (<span>0</span>)</button>
            <div class="comments">
                <input type="text" class="comment-input" placeholder="اكتب تعليقًا هنا..." onkeypress="if(event.key === 'Enter') addComment(this)">
                <div class="comments-list"></div>
            </div>
        `;
        postsDiv.appendChild(newPost);
        document.getElementById('newPost').value = '';
        document.getElementById('postImage').value = '';
    } else {
        alert('يرجى كتابة شيء أو تحميل صورة قبل الإضافة.');
    }
}

function likePost(button) {
    const likeCount = button.querySelector('span');
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
}

function addComment(input) {
    const commentText = input.value;
    if (commentText) {
        const commentsList = input.nextElementSibling;
        const newComment = document.createElement('div');
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);
        input.value = '';
    }
}

function loadProfileImage(event) {
    const imagePreview = document.getElementById('profileImagePreview');
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
}

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;

    // تحقق من عدم تكرار اسم المستخدم
    if (users.includes(username)) {
        alert('اسم المستخدم موجود بالفعل. يرجى اختيار اسم آخر.');
        return;
    }

    users.push(username);
    userProfile = {
        name: document.getElementById('name').value,
        username: username,
        bio: document.getElementById('bio').value,
        gender: document.getElementById('gender').value || 'غير محدد',
        birthPlace: document
document.getElementById('save').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const bio = document.getElementById('bio').value;
    // هنا يمكنك إضافة الكود لتخزين البيانات في قاعدة البيانات
    alert('تم حفظ الملف الشخصي');
});

// يمكنك إضافة مزايا المنشورات والتعليقات والمشاركة
function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = ''; // إفراغ القائمة الحالية
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <p>${post.content}</p>
            <button onclick="likePost('${post._id}')">إعجاب (${post.likes})</button>
            <hr>
        `;
        postList.appendChild(postElement);
    });
}

// وظيفة الإعجاب
function likePost(postId) {
    fetch(`/like/${postId}`, { method: 'POST' })
        .then(response => response.json())
        .then(updatedPost => {
            displayPosts(updatedPost); // تحديث العرض
        });
}
<section id="verification">
    <h2>طلب توثيق الحساب</h2>
    <input type="text" id="verification-info" placeholder="معلومات التوثيق">
    <button id="request-verification">إرسال طلب التوثيق</button>
</section>
document.getElementById('request-verification').addEventListener('click', function() {
    const info = document.getElementById('verification-info').value;
    // أرسل طلب التوثيق للخادم
    fetch('/request-verification', {
        method: 'POST',
        body: JSON.stringify({ info }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        alert('تم إرسال طلب التوثيق!');
    });
});
function displayUser(user) {
    const userElement = document.createElement('div');
    userElement.innerHTML = `
        <p>${user.name} ${user.isVerified ? '<span class="badge">موثق</span>' : ''}</p>
    `;
    return userElement;
}
