const fs = require('fs');

const VideoModel = require('../../models/video');

class Video {
    get(req, res) {
        VideoModel.find({})
            .then((videos) => {
                res.send({ videos });
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    }

    getOne(req, res) {
        VideoModel.findById(req.params.id)
            .then((video) => {
                res.send({ video });
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    }
}

module.exports = new Video();