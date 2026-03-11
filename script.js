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
