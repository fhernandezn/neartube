const VideoModel = require('./models/video');

module.exports = (mongoose) => {
    VideoModel.find({})
        .then((videos) => {
            if (!videos || !videos.length) {
                VideoModel.create({
                    name: 'Mamedyarov vence a Carlsen y gana Biel | Ajedrez comentado',
                    url: '/videos/chess.mp4'
                });
                VideoModel.create({
                    name: '¿Funcionaría la Purga en la vida real - Hey Arnoldo',
                    url: '/videos/1.mp4'
                });
                VideoModel.create({
                    name: '¿Qué se siente flotar en el MAR MUERTO',
                    url: '/videos/2.mp4'
                });
                VideoModel.create({
                    name: 'Grupo De Whatsapp',
                    url: '/videos/4.mp4'
                });
                VideoModel.create({
                    name: 'La Santísima de Santas',
                    url: '/videos/5.mp4'
                });
                VideoModel.create({
                    name: 'EL AZAFATO MOLESTO (Broma telefónica)',
                    url: '/videos/3.mp4'
                })
            }
        });
};