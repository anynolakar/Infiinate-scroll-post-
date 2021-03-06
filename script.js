const postContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

//Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

//Show posts in DOM

async function showPosts() {
  const post = await getPosts();

  post.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
  <h2 class="post-title">${post.title}</h2>
  <p class="post-body">
    ${post.body}
  </p>
</div>`;
    postContainer.appendChild(postEl);
  });
}
// Show loader & fetch more posts
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove(`show`);
  }, 1000);

  setTimeout(() => {
    page++;
    showPosts();
  }, 500);
}

//filter post by input
function filterPost(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(`.post`);

  posts.forEach((post) => {
    const title = post.querySelector(`.post-title`).innerText.toUpperCase();
    const body = post.querySelector(`.post-body`).innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = `flex`;
    } else {
      post.style.display = "none";
    }
  });
}
//show initial posts
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPost);

/* <div class="post">
<div class="number">1</div>
<div class="post-info">
  <h2 class="post-title">Post one</h2>
  <p class="post-body">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui
    voluptatum voluptate vero quam provident harum possimus, hic
    blanditiis fugit, illo quasi ducimus temporibus corrupti quaerat
    amet consequatur officia earum atque autem magnam tenetur. Eaque,
    expedita tempora temporibus error repellendus ipsa minima, ex
    facilis quia.
  </p>
</div>
</div>
</div>
<div id="post-container">
<div class="post">
<div class="number">2</div>
<div class="post-info">
  <h2 class="post-title">Post two</h2>
  <p class="post-body">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui
    voluptatum voluptate vero quam provident harum possimus, hic
    blanditiis fugit, illo quasi ducimus temporibus corrupti quaerat
    amet consequatur officia earum atque autem magnam tenetur. Eaque,
    expedita tempora temporibus error repellendus ipsa minima, ex
    facilis quia.
  </p>
</div>
</div> */
