const multer = require('multer');

const storage_image = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "./uploads");
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}_${Date.now()}` + '.jpeg');
    }
 });

 const image_filter = (req, file, callback) => {
     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
         callback(null,true);   
     } else {
         callback({ message: 'Unsupported File Format' }, false);
     }
 }

 const upload_image = multer({
     storage: storage_image,
     limits: { fileSize: 1024 * 1024 },
     fileFilter: image_filter
 });

 module.exports = upload_image;