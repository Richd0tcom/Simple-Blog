const commentSection = document.getElementById("comments");
const yes = document.getElementById("yes");

const id = localStorage.getItem("postId");

const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
fetch(url)
  .then((res) => res.json())
  .then((data) => renderComments(data));

function renderComments(args) {
  commentSection.innerHTML = args
    .map((comment, i) => {
      return `
        <div class="px-5 pt-7 pb-5 mt-9 md:mt-12 md:pb-12 md:pt-12 md:px-9 md:py-9 test rounded-lg shadow-lg">
          <p class="text-lg pt-3 tracking-tight leading-normal md:tracking-wide md:text-lg md:px-9 md:pt-7">${comment.body}</p>
          <div class="flex pt-3 md:px-5 md:pt-5 pb-5">
            
                <div class="flex items-center mt-2 pb-4">
                <img class='w-10 h-10 object-cover rounded-full' alt='User avatar'
                    src='./Images/profile-2.jpg'>

                <div class="pl-3">
                    <div class="font-medium">
                        ${comment.name}
                    </div>
                    <div class="text-gray-600 text-sm">
                        ${comment.email}
                    </div>
                </div>
            </div>
          </div>
        </div>
        
        `;
    })
    .join("");

  yes.innerHTML = `POST ID #${id}`;
}

let newId = 0;
localStorage.setItem("postId", newId);
