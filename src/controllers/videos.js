const Video = require( '../models/videos');

async function addVideo(req, res){
    const { like, name, author, description, keywords, url } = req.body;
    const video = new Video(
        {
            name, author, description, keywords, url, like
        }
    )
    await video.save();
    return res.json(video);
};

async function getVideo(req, res){
    const { id:code } = req.params;
    Video.findById(code).exec( (err, result) => {
        if (err) return res.status(400).send('cannot find the video.');
        return res.json(result);
    }
        );
}

async function getAllVideo(req, res){
    const video = await Video.find();
    return res.json(video);
}

async function updateVideo(req, res){
    const { id } = req.params;
    const { name, author, description, keywords, url, like } = req.body;
    const newVideo = await Video.findByIdAndUpdate(
        id,
        { name, author, description, keywords, url, like },
        {
          new: true, // return the updated object
          runValidators: true // run validator against new value
        }
      );
      if (!newVideo) {
        return res.status(404).json('video not found');
      }
      return res.json(newVideo);
    
    
}
async function deleteVideo(req, res){
    const { id:code } =req.params;
    const deletedVideo = await Video.findByIdAndDelete( code );
    if (!deletedVideo) {
        return res.sendStatus(404);
    }
    return res.sendStatus(200);
}



module.exports = {
    addVideo, 
    getAllVideo,
    getVideo,
    updateVideo,
    deleteVideo
};