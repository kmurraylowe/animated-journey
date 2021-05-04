const deleteBtn = document.querySelectorAll('.del');
const editBtn = document.querySelectorAll('.edit');

async function deletePost(){
    const postId = this.parentNode.parentNode.dataset.id;

    try {
        await fetch('posts/deletePost', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postIdFromJSFile: postId,
            })
        });

        location.reload();      

    }catch(error){
        console.log(error);
    };
};

Array.from(deleteBtn).forEach(btn => {
    btn.addEventListener('click', deletePost);
});