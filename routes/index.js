const express = require('express');

const Video = require('./resources/video');
const Comment = require('./resources/comment');

module.exports = () => {
    const Router = express.Router();

    Router.route('/video')
        .get(Video.get);//list of videos

    Router.route('/video/:id')
        .get(Video.getOne);//single video

    Router.route('/video/:video_id/comments')
        .get(Comment.get)//list of comments for this video
        .post(Comment.post);//add comment to this video

    return Router;
};