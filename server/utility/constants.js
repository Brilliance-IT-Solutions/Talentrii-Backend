const dotenv = require('dotenv').config();

module.exports = Object.freeze({
    appName: process.env.APP_NAME,
    JWTokenKey: process.env.ACCESS_TOKEN_SECRET,
    inValidToken: 'Your session has expired. Please login again to continue.',
    authenticationFailed:'Authentication Failed',
    S3_BUCKET_NAME:'talentrii-bucket',
    S3_IAM_USER_KEY:'AKIAZI2LH5QH44HXGWXO',
    S3_IAM_USER_SECRET:'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',
    REGION:"us-east-1",
    awsBucketLocationProfile: 'https://d2q26ndm07dl99.cloudfront.net/',
    blobRouter: '/router/blob/uploadfile',
    defaultImage : 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
});