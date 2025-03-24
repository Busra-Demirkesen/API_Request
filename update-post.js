const URL = "https://jsonplaceholder.typicode.com/posts";
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
console.log("Params:", params.toString());
console.log("Post ID:", postId);

const errorMessage = document.getElementById("error-message");

if (!postId) {
  errorMessage.innerText = "No post ID found!";
} else {
  fetch(`${URL}/${postId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((post) => {
      document.getElementById("post-title").value = post.title;
      document.getElementById("post-body").value = post.body;
    })
    .catch((error) => {
      errorMessage.innerText = `Error fetching post: ${error.message}`;
    });
}

const updateForm = document.getElementById("postForm");

updateForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const updatedTitle = document.getElementById("post-title").value.trim();
  const updatedBody = document.getElementById("post-body").value.trim();

  if (!updatedTitle || !updatedBody) {
    errorMessage.innerText = "Both fields are required!";
    return;
  }

  const updateData = {
    title: updatedTitle,
    body: updatedBody,
  };

  fetch(`${URL}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((updatedPost) => {
      document.getElementById("success-message").innerText =
        "Post updated successfully!";
      errorMessage.innerText = "";
    })
    .catch((error) => {
      errorMessage.innerText = `Error: ${error.message}`;
    });
});

const backButton = document.getElementById("back-to-home");
backButton.addEventListener("click", function () {
  window.location.href = "index.html";
});
