const deleteBtn = document.querySelectorAll('.del');
const like = document.querySelectorAll('.like')

Array.from(deleteBtn).forEach(el => {
	el.addEventListener('click', deleteTodo);
});

Array.from(like).forEach(el =>{
	el.addEventListener('click', likePost)
})


async function deleteTodo() {
	const postId = this.parentNode.dataset.id;
	try {
		const response = await fetch('posts/deletePost', {
			method: 'delete',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				'postIdFromJSFile': postId,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

async function likePost(){
	const postId = this.parentNode.dataset.id
	const currentLikes = Number(this.parentNode.childNodes[1].innerText)
	
	
	try{
		const res = await fetch('posts/like', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'postIdFromJSFile': postId,
				'likes': currentLikes
            })
		})
		location.reload()
		const data = await res.json()
		console.log(data)
		
	}
	catch(err){
		console.log(err)
	}
}
