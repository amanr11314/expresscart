const sharp = require("sharp")

exports.thumbnail = async (req, res, next) => {
    if (req.file && req.file.filename) {
        try {
            sharp(req.file.path).resize(200, 200).toFile('public/thumbnails/' + req.file.filename, (err, resizeImage) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(resizeImage);
                }
            })
            console.log('Thumbnail uploded successfully');
            next();
        } catch (error) {
            console.error(error);
        }
    }
    else { next(); }
}