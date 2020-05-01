const express = require('express');
const router = express.Router();
const { addVideo, getAllVideo, getVideo, updateVideo, deleteVideo } =  require('../controllers/videos');


router.post('/', addVideo);
router.get('/', getAllVideo);
router.get('/:id',getVideo);
router.put('/:id', updateVideo);
router.delete('/:id',deleteVideo);


module.exports = router;