const Post = require('../models/Posts');
const fs = require('fs');

module.exports = {
	getPosts: async (req, res) => {
		console.log(req.user);
		try {
			const postItems = await Post.find({}).populate('user', 'userName');
			res.render('posts.ejs', { posts: postItems, user: req.user });
		} catch (err) {
			console.log(err);
		}
	},
	createPost: async (req, res) => {
		try {
			console.log(req.body);
			await Post.create({
				title: req.body.title,
				caption: req.body.caption,
				user: req.user.id,
			});
			console.log('post has been added!');
			res.redirect('/posts');
		} catch (err) {
			console.log(err);
		}
	},
	likePost: async (req,res)=> {
		try{
			await Post.findOneAndUpdate({_id: req.body.postIdFromJSFile },{
				likes: req.body.likes +1
				
			})
			console.log('liked')
			res.json("Added like")
		}
		catch(err){
			console.log(err)
		}
	},
	deletePost: async (req, res) => {
		console.log(req.body.postIdFromJSFile);
		try {
			await Post.findOneAndDelete({ _id: req.body.postIdFromJSFile });
			console.log('Deleted Todo');
			res.json('Deleted It');
		} catch (err) {
			console.log(err);
		}
	},
};
