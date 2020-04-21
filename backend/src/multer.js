const multer = require('multer');

const storage_image = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "./uploads");
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}_${Date.now()}` + file.originalname);
    }
 });

 const image_filter = (req, file, callback) => {
     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
         callback(null,true);   
     } else {
         callback({ message: 'Unsupported File Format' }, false);
     }
 }

 const upload_image = multer({
     storage: storage_image,
     limits: { fileSize: 20000000 },
     fileFilter: image_filter
 });

 module.exports = upload_image;