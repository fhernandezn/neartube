const CommentModel = require('../../models/comment');
const eventEmitter = require('../../events');

class Comment {
    get(req, res) {
        CommentModel.find({
            video_id: req.params.video_id
        })
            .then((comments) => {
                res.send({comments});
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    }

    post(req, res) {
        CommentModel.create({
            content: req.body.content,
            video_id: req.params.video_id
        })
        .then((comment) => {
            eventEmitter.emit('new-comment');
            res.send({comment});
        })
        .catch((err) => {
            res.status(500).send(err.message);
        })
    }
}

module.exports = new Comment();