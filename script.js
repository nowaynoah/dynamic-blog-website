const postForm = document.getElementById("post-form");

if (postForm) {
    postForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const titleInput = document.getElementById("title").value.trim();
        const contentInput = document.getElementById("content").value.trim();
        const imageInput = document.getElementById("image").value.trim();

        if (titleInput === "" || contentInput === "") {
            alert("Title and content are required.");
            return;
        }

        const posts = JSON.parse(localStorage.getItem("posts")) || [];

        const newPost = {
            id: Date.now().toString(),
            title: titleInput,
            content: contentInput,
            image: imageInput,
            date: new Date().toLocaleString()
        };

        posts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(posts));

        alert("Post created successfully.");
        window.location.href = "index.html";
    });
}

const postsList = document.getElementById("posts-list");

if (postsList) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    if (posts.length === 0) {
        postsList.innerHTML = "<p>No blog posts available yet.</p>";
    } else {
        posts.forEach(function (post) {
            const postCard = document.createElement("div");
            postCard.classList.add("post-card");

            postCard.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content.substring(0, 100)}...</p>
                <p><strong>Created:</strong> ${post.date}</p>
                <a href="post.html?id=${post.id}">Read More</a>
            `;

            postsList.appendChild(postCard);
        });
    }
}

const postContent = document.getElementById("post-content");
const editPostForm = document.getElementById("edit-post-form");

if (postContent && editPostForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const selectedPost = posts.find(function (post) {
        return post.id === postId;
    });

    if (selectedPost) {
        postContent.innerHTML = `
            <h3>${selectedPost.title}</h3>
            <p>${selectedPost.content}</p>
            <p><strong>Created:</strong> ${selectedPost.date}</p>
        `;

        document.getElementById("edit-title").value = selectedPost.title;
        document.getElementById("edit-content").value = selectedPost.content;
    } else {
        postContent.innerHTML = "<p>Post not found.</p>";
        editPostForm.style.display = "none";
    }
}

if (editPostForm) {
    editPostForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedTitle = document.getElementById("edit-title").value.trim();
        const updatedContent = document.getElementById("edit-content").value.trim();

        if (updatedTitle === "" || updatedContent === "") {
            alert("Title and content are required.");
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("id");

        const posts = JSON.parse(localStorage.getItem("posts")) || [];

        const updatedPosts = posts.map(function (post) {
            if (post.id === postId) {
                return {
                    ...post,
                    title: updatedTitle,
                    content: updatedContent
                };
            }
            return post;
        });

        localStorage.setItem("posts", JSON.stringify(updatedPosts));

        alert("Post updated successfully.");
        window.location.href = "index.html";
    });
}
