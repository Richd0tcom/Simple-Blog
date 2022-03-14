const commentSection = document.getElementById('comments');
const yes = document.getElementById('yes');

const id = localStorage.getItem('postId');

const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
fetch(url)
    .then(res=>res.json())
    .then(data=> renderComments(data));


function renderComments(args) { 

    commentSection.innerHTML = args.map((comment,i)=>{
        return `
        <div class="px-5 pt-5 pb-5 mt-6 md:mt-12 md:pb-12 md:pt-12 test rounded-lg shadow-lg">
          <p class="text-lg pt-1 tracking-tight leading-normal md:tracking-wide md:text-lg md:px-4 md:pt-7">${comment.body}</p>
          <div class="flex pt-3 md:px-5 md:pt-5 pb-5">
            <div class=" self-center pt-1 "><img class="w-6 h-6 rounded-full md:w-8 md:h-8" src="./Images/profile-2.jpg"
                alt="commenter"></div>
            <div class="md:ml-3">
              <h4 class="text-lg pl-2 font-bold md:text-md md:tracking-wider">${comment.name}</h4>
              <p class="text-md pl-2 tracking-tight md:tracking-wide md:pt-2">${comment.email}</p>
            </div>
          </div>
        </div>
        
        `
    }).join('');


    yes.innerHTML = `POST ID #${id}`;
    
}

let newId = 0;
localStorage.setItem('postId', newId);