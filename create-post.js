function createPost() {
  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");

  errorMessage.innerHTML = "";
  successMessage.innerHTML = "";

  let isValid = true;
  let errorMessages = [];

  if (postTitle.trim() === "") {
    isValid = false;
    errorMessages.push("Title is required.");
  }

  if (postBody.trim() === "") {
    isValid = false;
    errorMessages.push("Post content is required.");
  }

  if (!isValid) {
    errorMessage.innerHTML = errorMessages.join("<br>");
    return;
  }

  const postData = {
    title: postTitle,
    body: postBody,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      successMessage.textContent = "Post created successfully!";
      document.getElementById("postForm").reset();
    })
    .catch((error) => {
      errorMessage.innerHTML = `Error: ${error.message}`;
    });
}

document
  .getElementById("postForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    createPost();
  });

const backButton = document.getElementById("back-to-home");
backButton.addEventListener("click", function () {
  window.location.href = "index.html";
});
