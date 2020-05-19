const Solution = require('../models/Solution');
const cloudinary = require('../cloudinary');
const upload = require('../multer');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        try {
            const response = await Solution.find();
            return res.status(200).json(response);

        } catch(err) {
            return res.status(400).send();
        }
    },
    async create(req, res) {
        try {
            if(req.files) {
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
            } else {

            const { name, email, address, solutionName, imgs, videos, coordinate, findedProblem } = req.body;

            const data = {
                solutionName,
                userName: name,
                userEmail: email,
                userAddress: address,
                imgs,
                videos,
                geolocation: coordinate,
                findedProblem
            }
            const response = await Solution.create(data);

            return res.status(200).json(response);
           
        }
        } catch(err) {
            console.log(err)
            return res.status(400).json(err);
        }

    },
    async update(req, res) {
        return res.status(400).send();
    }, 
    async delete(req, res) {
        return res.status(400).send();
    }
}