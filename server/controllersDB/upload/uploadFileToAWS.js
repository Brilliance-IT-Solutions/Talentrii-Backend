const jsonResponse = require("../../../server/utility/jsonResponse");
const statusCode = require("http-status-codes");
const fs = require("fs");
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
var ffprobe = require("ffprobe-static");
ffmpeg.setFfprobePath(ffprobe.path);
const constants = require("../../utility/constants");
const sharp = require('sharp')
const fluentffmpeg = require("fluent-ffmpeg");
const aws = require("aws-sdk");
const s3 = new aws.S3();
const { uploadSchema } = require("../../schemas/uploadSchema");
const genericFunctions = require("../../utility/genericFunctions");

aws.config.credentials = new aws.SharedIniFileCredentials({
  profile: 'Jeevan-bit',
});

aws.config.update({
   secretAccessKey: constants.S3_IAM_USER_SECRET,
   accessKeyId: constants.S3_IAM_USER_KEY,
  correctClockSkew: true,
  region:constants.REGION
});

const uploadFile = async (req, res, next) => {
  const dataArray = [];
  const  processedFiles = []
  const successFn = (result) => {
    jsonResponse.successHandler(res, next, result);
  };
  const errFn = (err, statusCode) => {
    jsonResponse.errorHandler(res, next, err, statusCode);
  };

  let data = {
    files : req.files,
    category: req.body.category
  }

  if(genericFunctions.validator(data,uploadSchema,errFn)===true)
  return;

  try {
    const files = req.files;
    if (!files) {
      console.log("Error during file uploading");
    } else {
      
      for (const file of req.files) {
        if (file.mimetype.startsWith('image')) {
          const [thumbnail, compressedImage] = await processImage(file.buffer)
           // Upload thumbnail to AWS S3
           const thumbnailKey = `images/thumbnails/${file.originalname}`;
          const thumbnailImage =  await uploadToS3(thumbnailKey, thumbnail, file.mimetype);
     
           // Upload compressed image to AWS S3
           const compressedImageKey = `images/compressed/${file.originalname}`;
           const compressedImageFile = await uploadToS3(compressedImageKey, compressedImage, file.mimetype);
           
           const obj = {
            thumbnailurl : `${constants.awsBucketLocationProfile}${thumbnailImage.key}`,
            originalurl : `${constants.awsBucketLocationProfile}${compressedImageFile.key}`,
            type:file.mimetype,
            category:req.body.category
           }
           
          processedFiles.push(obj); 
    
        } else if (file.mimetype.startsWith('video')) {
    
          const thumbnail = await generateVideoThumbnail(file.buffer);          
          const compressedVideo = await compressVideo(file.buffer, file.originalname);

          // Upload video thumbnail and compressed video to AWS S3
          var lastIndex = file.originalname.lastIndexOf(".");
          var newFilename = file.originalname.substring(0, lastIndex);
          const thumbnailKey = `videos/thumbnails/${newFilename}.jpg`;        
          const compressedVideoKey = `videos/compressed/${file.originalname}`;
         
          const thumbnailVideo = await uploadToS3(thumbnailKey, thumbnail, 'image/jpg');
          const compressedVideoFile =  await uploadToS3(compressedVideoKey, compressedVideo, 'video/mp4');

          const obj = {
            thumbnailurl : `${constants.awsBucketLocationProfile}${thumbnailVideo.key}`,
            originalurl : `${constants.awsBucketLocationProfile}${compressedVideoFile.key}`,
            type:file.mimetype,
            category:req.body.category
           }       
          processedFiles.push(obj); 
        }
      }
       response = {
        message: "Media Uploaded!",
        urls: processedFiles,
      };
    
      successFn(response)
      }
    
  } catch (error) {
    response = {
      message: error,
    };
    errFn(response, statusCode.StatusCodes.UNSUPPORTED_MEDIA_TYPE);
  }
};

async function processImage(imageBuffer) {
  const thumbnail = await sharp(imageBuffer)
    .resize(100, 100)
    .toBuffer();

  const compressedImage = await sharp(imageBuffer)
    .jpeg({ progressive: true, force: false,quality: 80 })
    .png({ progressive: true, force: false,quality: 80  })
    .toBuffer();

  return [thumbnail, compressedImage];
}

async function generateVideoThumbnail(videoBuffer) {
  return new Promise((resolve, reject) => {
    const tempFileName = 'temp.mp4';
    const outputFormat = path.extname(tempFileName) === '.mp4' ? 'jpg' : 'png';
    const outputFileName = `output.${outputFormat}`;

    fs.writeFileSync(tempFileName, videoBuffer);

    fluentffmpeg(tempFileName)
      .inputOption('-ss 00:00:02')
      .frames(1)
      .toFormat('image2')
      .on('end', () => {
        const thumbnail = fs.readFileSync(outputFileName);
        fs.unlinkSync(tempFileName);
        fs.unlinkSync(outputFileName);
        resolve(thumbnail);
      })
      .on('error', (err) => {
        fs.unlinkSync(tempFileName);
        reject(err);
      })
      .output(outputFileName)
      .run();
  });
}

async function compressVideo(videoBuffer) {
  return new Promise((resolve, reject) => {
    const tempFileName = 'temp.mp4';

    fs.writeFileSync(tempFileName, videoBuffer);
    fluentffmpeg(tempFileName)
    .videoCodec('libx264')
    .outputOption("-crf 20")
    .outputFormat('mp4')
    .on('end', () => {
      const compressedVideo = fs.readFileSync('output.mp4');
      fs.unlinkSync(tempFileName);
      fs.unlinkSync('output.mp4');
      resolve(compressedVideo);
    })
    .on('error', (err) => reject(err))
    .output('output.mp4')
    .run();
});

}

async function uploadToS3(key, file, mimetype) {
  let uploadedData
  const params = {
    Bucket: constants.S3_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: mimetype,
  };

  await new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
       if (err) {
         console.error("Error uploading thumbnail to S3:", err);
       } else {
         uploadedData = data
         resolve(data)
       }
     });

   })
 return uploadedData
}

module.exports = {
  uploadFile,
};
