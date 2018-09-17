const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: { type: String, required: true },
    video_id: { type: String, required: true }
}, { timestamps: true } );

module.exports = mongoose.model('Comment', CommentSchema);