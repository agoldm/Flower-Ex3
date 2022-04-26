var express = require('express');
var router = express.Router();
const multer = require('multer')
const checkUser = require("../middlewares/checkUser")
const { getAllFlowers, deleteFlower, addFlower, updateFlower } = require("../controllers/flowers")

router.get("/", async (req, res) => {
    res.json(await getAllFlowers())
})
//multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public/images");
    },
    filename(req, file = {}, cb) {
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
    },
});
const upload = multer({ storage });

//add flower and upload flower image
router.post("/", upload.single('uploaded_file'), async (req, res) => {
    req.body.image = 'images/' + req.file.filename;
    res.json(await addFlower(req.body))
})

//update flower
router.put("/:id", async (req, res) => {
    res.json(await updateFlower(req.params.id, req.body))
})

//delete flower
router.delete("/:id", async (req, res) => {
    res.json(await deleteFlower(req.params.id))
})
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
module.exports = router;