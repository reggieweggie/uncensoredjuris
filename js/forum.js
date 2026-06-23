let posts = [];

function addPost() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value;

  if (!title || !content) {
    alert("Please fill out all fields");
    return;
  }

  const post = {
    title,
    category,
    content,
    time: new Date().toLocaleString()
  };

  posts.unshift(post);
  displayPosts();

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

function displayPosts() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.title}</h3>
        <small>${p.category} • ${p.time}</small>
        <p>${p.content}</p>
      </div>
    `;
  });
}
