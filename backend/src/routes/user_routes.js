const express = require('express');
const router = express.Router();
const fs = require('fs');

const upload = require('../multer');
const cloudinary = require('../cloudinary');

router.post('/images', upload.array('imgs'), async (req, res) => {
    console.log(req.files[0]);
    try {
        const uploader = async (path) => await cloudinary.uploads(path, 'images/' + req.files[0].originalname);
        if(req.method === 'POST') {
            const urls = [];
    
            const files = req.files;
    
            for(const file of files) {
                const { path } = file;
    
                const newPath = await uploader(path);
    
                urls.push(newPath);
    
                fs.unlinkSync(path);
            }
            res.status(200).json({
                message: 'Imagens enviadas com sucesso.',
                data: urls
            });
        } else {
            res.status(405).json({
                err: "Erro ao enviar imagens."
            })
        }
    } catch(err) {
        console.log(err)
    }
});

// router.post('/videos', upload_video.single('video'), async (req, res) => {
//     console.log(req.file);
//     res.send();
// });

router.post('/solutions', (req, res) => {
    // console.log(req.body);
    res.send();
});

module.exports = router;