const express = require('express');
const router = express.Router();
const { addVideo, getAllVideo, getVideo, updateVideo, deleteVideo, belongToUser } =  require('../controllers/videos');


router.post('/', addVideo);
router.get('/', getAllVideo);
router.get('/:id',getVideo);
router.put('/:id', updateVideo);
router.delete('/:id',deleteVideo);
router.post('/:id/:videoID', belongToUser);

module.exports = router;