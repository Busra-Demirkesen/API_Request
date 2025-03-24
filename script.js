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
        postTitle.textContent = post.title;
        const pItem = document.createElement("p");
        pItem.classList.add("post-body");
        pItem.textContent = post.body;

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("button-group");
        const updatePostButton = document.createElement("a");
        updatePostButton.href = `./update-post.html?id=${post.id}`;
        updatePostButton.textContent = "Update";
        updatePostButton.classList.add("button", "button--update");

        const deletePostButton = document.createElement("button");
        deletePostButton.textContent = "Delete";
        deletePostButton.addEventListener("click", () => deletePost(post.id));
        deletePostButton.classList.add("button", "button--danger");

        buttonGroup.appendChild(updatePostButton);
        buttonGroup.appendChild(deletePostButton);

        liItem.appendChild(postTitle);
        liItem.appendChild(pItem);
        liItem.appendChild(buttonGroup);
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
      postID.value = "";

      const postItem = document.createElement("li");
      postItem.classList.add("post");

      const postTitle = document.createElement("h2");
      postTitle.classList.add("post-title");
      postTitle.textContent = post.title;
      const postBody = document.createElement("p");
      postBody.classList.add("post-body");
      postBody.textContent = post.body;

      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("button-group");

      const updatePostButton = document.createElement("a");
      updatePostButton.href = `./update-post.html?id=${post.id}`;
      updatePostButton.textContent = "Update";
      updatePostButton.classList.add("button", "button--update");

      const deletePostButton = document.createElement("button");
      deletePostButton.textContent = "Delete";
      deletePostButton.addEventListener("click", () => deletePost(post.id));
      deletePostButton.classList.add("button", "button--danger");

      buttonGroup.appendChild(updatePostButton);
      buttonGroup.appendChild(deletePostButton);

      postItem.appendChild(postTitle);
      postItem.appendChild(postBody);
      postItem.appendChild(buttonGroup);
      document.getElementById("posts-container").appendChild(postItem);
    });
}

function deletePost(postId) {
  const modal = document.getElementById("confirmation-modal");
  const confirmBtn = document.getElementById("confirm-delete");
  const cancelBtn = document.getElementById("cancel-delete");
  modal.style.display = "flex";

  cancelBtn.onclick = function () {
    modal.style.display = "none";
  };

  confirmBtn.onclick = function () {
    modal.style.display = "none";

    fetch(`${URL}/${postId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const postElement = document.getElementById(`post-${postId}`);
        if (postElement) {
          postElement.remove();
        }
        showMessage("Post deleted successfully!", "success");
      });
  };
}

function showMessage(text, type) {
  const messageBox = document.getElementById(
    type === "success" ? "success-message" : "error-message"
  );
  if (!messageBox) return;

  messageBox.innerText = text;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000);
}
