const multer = require("multer")

function multerSetup() {
    //Configuration for Multer
    const multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public");
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
        },
    });
    return multerStorage;
}

withUploadFile = {
    upload: function (file) {
        const upload = multer({
            storage: multerSetup()
        })
        return upload.single(file)
    }
}

module.exports = withUploadFile;