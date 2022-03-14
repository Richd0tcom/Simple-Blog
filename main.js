

const postList = document.querySelector('.posts-list');
const postForm =  document.querySelector('.add-post');
const titleValue = document.getElementById('title-value');
const comSection = document.getElementById('add-post');
const submitBtn = document.querySelector('.btn-submit');
const tit = document.querySelector('.title');
const bod = document.querySelector('.body');

const bodyValue = comSection.querySelector('#content');
console.log(bodyValue)


const url = `https://jsonplaceholder.typicode.com/posts`
fetch(url)
    .then(res=>res.json())
    .then(data=> renderPosts(data));

function renderPosts(data) {

    postList.innerHTML = data.map((postData)=>{
        return `
    
            <div class="overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
                        <a href="#" class="w-full block h-full">
                            <img alt="blog photo"
                                src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                                class="max-h-40 w-full object-cover" />
    
    
    
                            <div class="bg-white w-full p-4">
    
                                <button
                                    class="bg-blue-500  px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white ">
                                    Motivation
                                </button>
    
                                <p class="text-indigo-500 text-2xl font-medium pt-3 title">
                                    ${postData.title}
                                </p>
                                <p class="text-gray-800 text-sm font-medium mb-2">
                                    A comprehensive guide about online education.
                                </p>
                                <p class="text-gray-600 font-light text-md elli line-clamp-2 body">
                                    ${postData.body}
                                    
                                </p>
                                <a class="inline-flex text-indigo-500" href="single-post.html" data-index="${postData.id}" id="read-more">Read More</a>
                                <div
                                    class="flex flex-wrap justify-starts items-center py-3 border-b-2 text-xs text-white font-medium" data-index="${postData.id}">
                                    <span class="m-1 px-2 py-1 rounded bg-indigo-500" id="edit-post">
                                        Edit
                                    </span>
                                    <span class="m-1 px-2 py-1 rounded bg-rose-500" id="delete-post">
                                        Delete
                                    </span>
                                   
                                </div>
                                <div class="flex items-center mt-2 pb-4">
                                    <img class='w-10 h-10 object-cover rounded-full' alt='User avatar'
                                        src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'>
    
                                    <div class="pl-3">
                                        <div class="font-medium">
                                            Jean Marc
                                        </div>
                                        <div class="text-gray-600 text-sm">
                                            CTO of Supercars
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
            </div>
    
        `
    }).slice(0,9).join('');
}



//create posts

postForm.addEventListener('submit', addPost);

function addPost(e) {
    e.preventDefault();
    console.log(titleValue);

    fetch(url,{
        //post method header and body 
        method:'POST',
        body: JSON.stringify({
            title: titleValue.value,
            body:bodyValue.value,
            userId:1,
        }),
        headers:{
            'Content-type':'application/json; charset=UTF-8',
        },
    })
        .then(res=>res.json)
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })
}

function updatePosts (args){
    tit.innerHTML = args.title;
    bod.innerHTML = args.body;
}

postList.addEventListener('click', mutatePost);
//edit or delete posts
function mutatePost(e) {
    e.preventDefault();
    let isDeleteButton = e.target.id === 'delete-post';
    let isEditButton = e.target.id === 'edit-post';
    
     let postIdd = e.target.parentElement.dataset.index;


    //Delete
    if(isDeleteButton){

        
                

        fetch(`${url}/${postIdd}`,{
            method:'DELETE',
        })
            .then(res=>res.json)
            .then(()=>{

                if(confirm('are you sure?')){
                    //add manual deleting here
                    const child = e.target.parentElement.parentElement.parentElement;
                    postList.removeChild(child);
                    console.log(child)
                }
                    

                
            });

        
    }
    
    //Edit
    if(isEditButton){
       
        const parent = e.target.parentElement.parentElement.parentElement;
        let titleContent = parent.querySelector('.title').textContent;
        let bodyContent = parent.querySelector('.body').textContent;
        

        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
        window.location.href='#add-post';

        
        
    }


    submitBtn.addEventListener('click',(e)=>{
        e.preventDefault
        fetch(url,{
            //post method header and body 
            method:'PATCH',
            body: JSON.stringify({
                title: titleValue.value,
                body:bodyValue.value,
                userId:1,
            }),
            headers:{
                'Content-type':'application/json; charset=UTF-8',
            },
        })
            .then(res=>res.json)
            .then(data=> updatePosts(data))
    })

    //view single comments
    if(e.target.id === 'read-more'){
        const postId = e.target.dataset.index;
        localStorage.setItem('postId', postId);
        window.location.href='single-post.html';
    }
}


