const Post = require('../models/Posts');
const fs = require('fs');

module.exports = {
	getPosts: async (req, res) => {
		try {
			const posts = await Post.find({}).populate('user', 'userName');
			res.render('posts.ejs', { posts: posts, user: req.user });
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
	likePost: async (req, res) => {
		try {
			await Post.findOneAndUpdate({ _id: req.body.postIdFromJSFile }, {
				likes: req.body.likes + 1

			})
			console.log('liked')
			res.json("Added like")
		}
		catch (err) {
			console.log(err)
		}
	},
	deletePost: async (req, res) => {
		console.log('We have hit the route');
		try {

			// Delete post from db
			await Post.deleteOne({ _id: req.body.postIdFromJSFile });
			console.log("Deleted Post");
			res.json("Succesful Delete");
		} catch (err) {
			res.redirect("/posts");
		}
	},
};
