const Video = require( '../models/videos');
const User = require('../models/users');

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
    //joi.validate({ }, template) don't use the mongoose schema, but rely on joi schema. - repeat shcema, 
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
async function belongToUser(req, res) {
    //find the userID and videoID
    const {id, videoID} = req.params; 

    //map videos to user
    const user = await User.findById(id);
    const video = await Video.findById(videoID);
    if ( !user ){
        return res.sendStatus(404).json('Invalid user');
    } else if ( !video ){
        return res.sendStatus(404).json('Video not found');
    } 
    // const oldLength = user.videos.length;
    user.videos.addToSet(video._id);
    video.author = user.username;
    await user.save();
    await video.save();
    return res.json( video );
    // const newLength = user.video.length;
    // if (newLength - oldLength){
    //     await user.save();
    //     return res.json(user);
    // } else{
    //     return res.status(404).json('something went wrong');
    // }
    //return success/ not successful


}


module.exports = {
    addVideo, 
    getAllVideo,
    getVideo,
    updateVideo,
    deleteVideo,
    belongToUser
};