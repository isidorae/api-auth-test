const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        title: { type: String },
        body: { type: String },
        img: { type: String },
        state: { type: Boolean },
        category: {
            type: mongoose.ObjectId,
            ref: 'category'
        },
        user: {
            type: mongoose.ObjectId,
            ref: 'user'
        }
    }
)

const Post = mongoose.model('post', postSchema);
module.exports = Post;