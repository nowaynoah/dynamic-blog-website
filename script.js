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