const Post = require('../models/Posts');
const cloudinary = require("../middleware/cloudinary")
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
			const result = await cloudinary.uploader.upload(req.file.path);
			
			await Post.create({
				title: req.body.title,
				image: result.secure_url,
       		    cloudinaryId: result.public_id,
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
			const post = await Post.findById(req.body.postIdFromJSFile);

			if(post){
				await post.updateOne({$set: {
					likes: post.likes + 1,
				}});

				return res.json({ message: 'Successfully added like' });
			}

			return res.json({ message: 'Could not find post' });
		}
		catch (err) {
			console.log(err)
		}
	},
	deletePost: async (req, res) => {
		console.log('We have hit the route');
		try {
			let post = await Post.findById({ _id: req.body.postIdFromJSFile })
			// Delete post from db
			await cloudinary.uploader.destroy(post.cloudinaryId);
			await Post.remove({_id: req.body.postIdFromJSFile})
			console.log("Deleted Post");
			res.json("Succesful Delete");
		} catch (err) {
			res.redirect("/posts");
		}
	},
};
