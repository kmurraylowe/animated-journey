const Post = require('../models/Posts');

module.exports = {
	getPosts: async (req, res) => {
		console.log(req.user);
		try {
			const postItems = await Post.find({ userId: req.user.id });
			const itemsLeft = await Post.countDocuments({ userId: req.user.id, completed: false });
			res.render('posts.ejs', { posts: postItems, left: itemsLeft, user: req.user });
		} catch (err) {
			console.log(err);
		}
	},
	createPost: async (req, res) => {
		try {
			await Post.create({ post: req.body.postItem, completed: false, userId: req.user.id });
			console.log('post has been added!');
			res.redirect('/posts');
		} catch (err) {
			console.log(err);
		}
	},
	markComplete: async (req, res) => {
		try {
			await Post.findOneAndUpdate(
				{ _id: req.body.postIdFromJSFile },
				{
					completed: true,
				}
			);
			console.log('Marked Complete');
			res.json('Marked Complete');
		} catch (err) {
			console.log(err);
		}
	},
	markIncomplete: async (req, res) => {
		try {
			await Post.findOneAndUpdate(
				{ _id: req.body.postIdFromJSFile },
				{
					completed: false,
				}
			);
			console.log('Marked Incomplete');
			res.json('Marked Incomplete');
		} catch (err) {
			console.log(err);
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
