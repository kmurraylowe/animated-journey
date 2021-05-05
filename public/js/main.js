const deleteBtn = document.querySelectorAll('.del');
const like = document.querySelectorAll('.like')

Array.from(deleteBtn).forEach(el => {
	el.addEventListener('click', deleteTodo);
});

Array.from(like).forEach(el => {
	el.addEventListener('click', likePost)
})


async function deleteTodo() {
	const postId = this.parentNode.parentNode.parentNode.dataset.id;
	try {
		const response = await fetch('posts/deletePost', {
			method: 'delete',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				postIdFromJSFile: postId,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

<<<<<<< HEAD
async function likePost() {
	const postId = this.parentNode.dataset.id
	const currentLikes = Number(this.parentNode.childNodes[1].innerText)


	try {
		const res = await fetch('posts/like', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				postIdFromJSFile: postId,
				likes: currentLikes
			})
=======
async function likePost(){
	const postId = this.parentNode.parentNode.parentNode.dataset.id;
	
	try{
		const res = await fetch('posts/like', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'postIdFromJSFile': postId,
            })
>>>>>>> f1a92a9b61d1592ff92cf7d33720af8585782f6f
		})
		location.reload()
		const data = await res.json()
		console.log(data)

	}
	catch (err) {
		console.log(err)
	}
}
Array.from(deleteBtn).forEach(el => {
	el.addEventListener('click', deleteTodo);
});

Array.from(like).forEach(el =>{
	el.addEventListener('click', likePost)
})



