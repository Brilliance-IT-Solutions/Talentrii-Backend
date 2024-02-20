module.exports = Object.freeze({

    dataTypeEnum: {
        varChar: 'VarChar',
        int: 'Int',
        nvarChar: 'NVarChar',
        float: 'Float',
        decimal: 'Decimal',
        real: 'Real',
        bit: 'Bit',
        date: 'Date',
        time: 'Time'

    },
    
    procedureEnum: {
        proc_login: 'proc_login',
        proc_signUp: 'proc_signUp',
        proc_create_challange: 'proc_create_challange',
        proc_get_dashboard_data: 'proc_get_dashboard_data',
        proc_upload_media: 'proc_upload_media',
        proc_delete_file: 'proc_delete_file',
        proc_create_challenge_privacy: 'proc_create_challenge_privacy',
        proc_getChallenge_Privacy: 'proc_getChallenge_Privacy',
        proc_like_challange:'proc_like_challange',
        proc_comment_challange:'proc_comment_challange',
        proc_getcomments_challange:'proc_getcomments_challange',
        proc_getuser_detail:'proc_getuser_detail',
        proc_purpose_challange:'proc_purpose_challange',
        proc_editProfile:"proc_editProfile",
        proc_getChallenges_By_Id:"proc_getChallengeDetail_ByChallengeId",
        proc_getChallenges_By_UserId:"proc_getChallenges_By_UserId",
        proc_search_challenge:"proc_search_challenge",
        proc_Follow_User:"proc_Follow_User",
        proc_getFollowing_By_UserId:"proc_getFollowing_By_UserId",
        proc_getFollowers_By_UserId:"proc_getFollowers_By_UserId",
        proc_getuser_status:"proc_getuser_status",
        proc_mutualFriends:"proc_mutualFriends",
        proc_saved_challange:"proc_saved_challenge"
    },

    errorEnum: {
        proc_login: 'LOGIN-ERROR',
        proc_signUp: 'SIGN-UP-ERROR',
        proc_create_challange: 'CREATE-CHALLANGE-ERROR',
        proc_get_dashboard_data: 'GET-DASHBOARD-DATA-ERROR',
        proc_upload_media:'UPLOAD_MEDIA_ERROR',
        proc_delete_file: 'DELETE_MEDIA_ERROR',
        proc_create_challenge_privacy:'CREATE_CHALLENGE_PRIVACY',
        proc_getChallenge_Privacy: 'GET_CHALLENGE_PRIVACY',
        proc_like_challange:"LIKE_CHALLENGE_ERROR",
        proc_comment_challange:'COMMENT_CHALLENGE_ERROR',
        proc_getcomments_challange:'GETCOMMENTS_CHALLENGE_ERROR',
        proc_getuser_detail:'GETUSER_DETAIL_ERROR',
        proc_purpose_challange:'PURPOSE_CHALLENGE_ERROR',
        proc_editProfile:"EDITPROFILE_ERROR",
        proc_getChallenges_By_Id:"GET_CHALLENGE_BY_ID_ERROR",
        proc_getChallenges_By_UserId:"GET_CHALLENGE_BY_USERID_ERROR",
        proc_search_challenge:"SEARCH_CHALLENGE_ERROR",
        proc_Follow_User:"FOLLOW_USER_ERROR",
        proc_getFollowing_By_UserId:"ERROR_GETTING_FOLLOWING",
        proc_getFollowers_By_UserId:"ERROR_GETTING_FOLLOWERS",
        proc_getuser_status:"ERROR_USER_STATUS",
        proc_mutualFriends:"ERROR_GETTING_MUTUAL_FRIENDS",
        proc_saved_challange:"ERROR_SAVING_CHALLANGE"

    }
})


// dataTypeEnum = {
//     varChar: 'VarChar',
//     int: 'Int',
//     nvarChar: 'NVarChar',
//     float: 'Float',
//     decimal: 'Decimal',
//     real: 'Real',
//     bit: 'Bit',
//     date: 'Date'
// },

// procedureEnum = {
//     proc_login: 'proc_login',
//     proc_signUp: 'proc_signUp',
//     proc_create_challange: 'proc_create_challange'
// },

// errorEnum = {
//     proc_login: 'LOGIN-ERROR',
//     proc_signUp: 'SIGN-UP-ERROR',
//     proc_create_challange: 'CREATE-CHALLANGE-ERROR'
// }

// module.exports = {
//     dataTypeEnum,
//     procedureEnum,
//     errorEnum
// }
