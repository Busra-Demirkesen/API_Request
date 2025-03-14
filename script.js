/* 
CRUD - set of basic operations or functions that are commonly used in the context of database management and web applications to manage and manipulate data.
C - create - POST method (has request body to transfer data)
R - read - GET method (cannot have request body to send data to the server)
U - update - PUT / PATCH method (have request body to transfer data)
D - delete - DELETE method


Status codes
HTTP status codes are three-digit numbers that the server sends in response to a client's request made to a web server. They provide information about the outcome of the request, whether it was successful, encountered an error, or requires further action. HTTP status codes are grouped into several ranges, each indicating a different category of response. 
100... - Informational Responses
200... - Successful Responses (200 OK, 201 Created, 204 No content)
300.. - redirection (301 Moved Permanently, Found (or 307 Temporary Redirect))
400... - Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
500... - Service error (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable)
*/

const URL = "https://jsonplaceholder.typicode.com/posts";

document.getElementById("fetch-posts").addEventListener("click", getPosts);

const searchIdButton = document.querySelector(".search-id-button");

searchIdButton.addEventListener("click", getPostById);

function getPosts() {
  console.log("Getting posts");
  fetch(URL)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const liItem = document.createElement("li");
        liItem.classList.add("post");
        const postTitle = document.createElement("h2");
        postTitle.classList.add("post-title");
        postTitle.textContent = posts.title;
        const pItem = document.createElement("p");
        pItem.classList.add("post-body");
        pItem.textContent = post.body;

        const updatePostButton = document.createElement("a");
        updatePostButton.href = `./update-post.html?id=${post.id}`;
        updatePostButton.textContent = "Update";
        updatePostButton.classList.add("button", "button--success");

        const deletePostButton = document.createElement("button");
        deletePostButton.textContent = "Delete";
        deletePostButton.addEventListener("click", () => deletePost(post.id));
        deletePostButton.classList.add("button", "button--danger");

        liItem.appendChild(postTitle);
        liItem.appendChild(pItem);
        liItem.appendChild(updatePostButton);
        liItem.appendChild(deletePostButton);
        document.getElementById("posts-container").appendChild(liItem);
      });
    });
}

function getPostById() {
  const postID = document.querySelector(".input-id").value;

  console.log("Getting post ID", postID);

  const URL = `https://jsonplaceholder.typicode.com/posts/${postID}`;

  fetch(URL)
    .then((response) => response.json())
    .then((post) => {
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = "";
      document.querySelector(".input-id").value = "";

      const postItem = document.createElement("li");
      postItem.classList.add("post");

      const postTitle = document.createElement("h2");
      postTitle.classList.add("post-title");
      postTitle.textContent = post.title;
      const postBody = document.createElement("p");
      postBody.classList.add("post-body");
      postBody.textContent = post.body;

      const updatePostButton = document.createElement("a");
      updatePostButton.href = `./update-post.html?id=${post.id}`;
      updatePostButton.textContent = "Update";
      updatePostButton.classList.add("button", "button--success");

      const deletePostButton = document.createElement("button");
      deletePostButton.textContent = "Delete";
      deletePostButton.addEventListener("click", () => deletePost(post.id));
      deletePostButton.classList.add("button", "button--danger");

      postItem.appendChild(postTitle);
      postItem.appendChild(postBody);
      postItem.appendChild(updatePostButton);
      postItem.appendChild(deletePostButton);
      document.getElementById("posts-container").appendChild(postItem);
    });
}

function createPost() {
  // Get the form data
  // Validate the form data
  // If form data is not valid, show error messages on the screen (do NOT use alert!)
  // If form data is valid, make an API request to create the post (POST request)
  // Once succesccful response is recieved, show a success message on the screen
  // Clear the form

  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;

  let isValid = true;
  let errorMessage = [];

  if (postTitle.trim() === "") {
    isValid = false;
    errorMessage.push("Title is required");
  }

  if (postBody.trim() === "") {
    isValid = false;
    errorMessage.push("Post content is required");
  }

  if (!isValid) {
    document.getElementById("error-message").innerHTML =
      errorMessage.join("<br>");
    return;
  }

  const postData = {
    title: postTitle,
    body: postBody,
  };

  fetch("https://api.example.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(postData),
  })
    .then((response) => response.JSON())
    .then((data) => {
      document.getElementById("success-message").innerHTML =
        "Post created successfully!";
      document.getElementById("postForm").reset();
    })

    .catch((error) => {
      document.getElementById(
        "error-message"
      ).innerHTML = `Error: ${error.message}`;
    });
}

const createdForm = document.getElementById("postForm");

createdForm.addEventListener("submit", function (event) {
  event.preventDefault();
  createPost();
});

function updatePost() {}

function deletePost(postId) {
  fetch(`${URL}/${postId}`, {
    method: "DELETE",
  });
}
