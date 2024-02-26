const express = require('express');
const router = express.Router();
const authenticate = require('../server/middleware/authenticate')
const login = require('./controllersDB/auth/loginDB')
const signUp = require('./controllersDB/auth/signUpDB')
const upload = require("../server/middleware/image-uploader")
const deleteCommentDB = require('./controllersDB/comment/deleteCommentDB')
const challange = require('./controllersDB/challenge/createChallangeDB')
const dashboard = require('./controllersDB/dashboard/getDashboardDataDB')
const checkFileSizeBasedOnType = require("../server/middleware/filesize")
const privacyDB = require("../server/controllersDB/createPrivacyDB")
const getPrivacyDB = require("../server/controllersDB/getPrivacyDB");
const uploadVideo = require("./controllersDB/upload/apiVideo")
const uploadFile = require("../server/controllersDB/upload/uploadFileToAWS")
const challengeLiked = require("./controllersDB/like/challengeLikedDB")
const challengeCommented = require("./controllersDB/comment/challengeCommentedDB")
const getCommensChallenge = require("./controllersDB/comment/getCommentsDataDB")
const getUserDetail = require("./controllersDB/profile/getUserDetailDataDB")
const getPurposeChallenge = require("../server/controllersDB/purposeChallengeDB")
const updateProfileDB = require("./controllersDB/profile/editProfileDB")
const getChallengeById = require("./controllersDB/challenge/getChallengesByChallengeId")
const getChallengeByUserId = require("./controllersDB/challenge/getChallengeByUserIdDB")
const searchApiDB = require("../server/controllersDB/searchApiDB")
const FollowUserDB = require("./controllersDB/follower/FollowUserDB")
const getFollowersByUserIdDataDB = require("./controllersDB/follower/getFollowersByUserId")
const getMutualFriends = require("./controllersDB/follower/mutualFriends")
const saveChallenge = require("../server/controllersDB/saved/saveChallengeDB")
const editChallengeDB = require("../server/controllersDB/challenge/editChallengeDB")

router.get('/', function (req, res, next) {
    res.send('SERVER STARTED 1234', process.env.DB_NAME);
})


router.post('/login', login.loginDB)
router.post('/signUp', signUp.signUpDB)
router.post('/createChallange', authenticate,challange.createChallangeDB)
router.get('/getDashboardData', authenticate, dashboard.getDashboardDataDB)
router.post('/privacy',authenticate , privacyDB.privacyDB)
router.get('/privacy',authenticate, getPrivacyDB.getPrivacyDB)
router.delete('/delete',authenticate, deleteCommentDB.deleteCommentDB)
router.post('/upload' ,authenticate,upload.array('files',7), uploadVideo.uploadVideo)
router.post('/uploadFile' ,authenticate,upload.array('files',7), uploadFile.uploadFile)
router.post('/likechallenge' , authenticate,challengeLiked.challengeLikedDB)
router.post('/commentChallenge' , authenticate,challengeCommented.challengeCommentedDB)
router.get('/getcommentChallenge' , authenticate,getCommensChallenge.getCommentsDataDB)
router.get('/getUserDetailById' , authenticate,getUserDetail.getUserDetailDataDB)
router.post('/getPurposeChallenge' , authenticate,getPurposeChallenge.PurposeChallengeDataDB),
router.patch('/updateProfile', authenticate,updateProfileDB.editProfileDB)
router.get('/getChallengeById', authenticate,getChallengeById.getChallengeByChallengeId)
router.get('/getChallengeByUserId',authenticate,getChallengeByUserId.getChallengeByUserIdDB)
router.get("/search", authenticate ,searchApiDB.searchApiDB)
router.post("/follow", authenticate ,FollowUserDB.FollowUserDB)
router.get("/followers", authenticate ,getFollowersByUserIdDataDB.getFollowersByUserIdDataDB)
router.get("/mutual-friends", authenticate ,getMutualFriends.getMutualFriendsDataDB)
router.post("/savechallenge", authenticate ,saveChallenge.challengeSavedDB),
router.post("/editChallenge",authenticate,editChallengeDB.editChallengeDB)


module.exports = router;
