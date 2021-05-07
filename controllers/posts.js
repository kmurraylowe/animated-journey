const Post = require('../models/Posts');
const cloudinary = require("../middleware/cloudinary")
const fs = require('fs');

module.exports = {
	getPosts: async (req, res) => {
		try {
			const posts = await Post.find({}).sort({createdAt: "desc"}).populate('user', 'userName');
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
	updatePost: async (req, res) => {
		const { postId } = req.params;
		const { title, caption } = req.body;
		const img = req.file;

		try {
			// Find the post
			const post = await Post.findById(postId);
			let cloudinaryResult;

			// Check if a new image is provided
			if(img){
				// Delete previous image in cloudinary
				await cloudinary.uploader.destroy(post.cloudinaryId);

				// Upload new image to cloudinary
				cloudinaryResult = await cloudinary.uploader.upload(img.path);
			}

			await post.updateOne({ $set: {
				title,
				caption,
				image: cloudinaryResult ? cloudinaryResult.secure_url : post.image,
				cloudinaryId: cloudinaryResult ? cloudinaryResult.public_id : post.cloudinaryId,
			}});

			res.redirect(`/profile/${req.user.id}`);
		}catch(error){
			console.log(error);
		};
	},
	deletePost: async (req, res) => {
		try {
			let post = await Post.findById({ _id: req.body.postIdFromJSFile })
			// Delete post from db
			await cloudinary.uploader.destroy(post.cloudinaryId);
			await post.remove()
			console.log("Deleted Post");
			res.json({ message: 'Successfully deleted post' });
		} catch (err) {
			res.redirect("/posts");
		}
	},
};
