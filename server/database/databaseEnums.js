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
        proc_post_login: 'proc_post_login',
        proc_post_signUp: 'proc_post_signUp',
        proc_post_createChallange: 'proc_post_createChallange',
        proc_get_dashboardData: 'proc_get_dashboardData',
        proc_post_uploadMedia: 'proc_post_uploadMedia',
        proc_post_like:'proc_post_like',
        proc_post_comment:'proc_post_comment',
        proc_get_comments:'proc_get_comments',
        proc_get_userDetail:'proc_get_userDetail',
        proc_get_challengeDetailByChallengeId:"proc_get_challengeDetailByChallengeId",
        proc_get_challengesByUserId:"proc_get_challengesByUserId",
        proc_post_follow:"proc_post_follow",
        proc_get_FollowerByUserId:"proc_get_FollowerByUserId",
        proc_get_userStatus:"proc_get_userStatus",
        proc_get_mutualFriends:"proc_get_mutualFriends",
        proc_post_saveChallenge:"proc_post_saveChallenge",
        proc_delete_comments: 'proc_delete_comments',
        proc_update_Profile:"proc_update_Profile",
        proc_update_Challenge:"proc_update_Challenge",
        // proc_create_challenge_privacy: 'proc_create_challenge_privacy',
        // proc_getChallenge_Privacy: 'proc_getChallenge_Privacy',
        // proc_purpose_challange:'proc_purpose_challange',
        proc_search_challenge:"proc_search_challenge",
    },

    errorEnum: {
        proc_post_login: 'LOGIN-ERROR',
        proc_post_signUp: 'SIGN-UP-ERROR',
        proc_post_createChallange: 'CREATE-CHALLANGE-ERROR',
        proc_get_dashboardData: 'GET-DASHBOARD-DATA-ERROR',
        proc_post_uploadMedia:'UPLOAD_MEDIA_ERROR',
        proc_post_like:"LIKE_CHALLENGE_ERROR",
        proc_post_comment:'COMMENT_CHALLENGE_ERROR',
        proc_get_comments:'GETCOMMENTS_CHALLENGE_ERROR',
        proc_get_userDetail:'GETUSER_DETAIL_ERROR',
        proc_get_challengeDetailByChallengeId:"GET_CHALLENGE_BY_ID_ERROR",
        proc_get_challengesByUserId:"GET_CHALLENGE_BY_USERID_ERROR",
        proc_post_follow:"FOLLOW_USER_ERROR",
        proc_get_FollowerByUserId:"ERROR_GETTING_FOLLOWERS",
        proc_get_userStatus:"ERROR_USER_STATUS",
        proc_get_mutualFriends:"ERROR_GETTING_MUTUAL_FRIENDS",
        proc_post_saveChallenge:"ERROR_SAVING_CHALLANGE",
        proc_delete_comments: 'DELETE_COMMENTS_ERROR',
        proc_update_Profile:"EDITPROFILE_ERROR",
        proc_update_Challenge:"ERROR_UPDATING_CHALLENGE",
        // proc_create_challenge_privacy:'CREATE_CHALLENGE_PRIVACY',
        // proc_getChallenge_Privacy: 'GET_CHALLENGE_PRIVACY',
        // proc_purpose_challange:'PURPOSE_CHALLENGE_ERROR',
        proc_search_challenge:"SEARCH_CHALLENGE_ERROR",

    },

    procedureEnumAdmin:{
     proc_admin_post_login:"proc_admin_post_login",
     proc_admin_get_allUser:"proc_admin_get_allUsers",
     proc_admin_get_countByUserDate:"proc_admin_get_countByUserDate",
     proc_admin_update_status:"proc_admin_update_status",
     proc_admin_delete_user:"proc_admin_delete_user",
     proc_admin_get_searchResult:"proc_admin_get_searchResult"
    },

    errorEnumAdmin: {
        proc_admin_post_login:"ERROR_ADMIN_LOGIN",
        proc_admin_get_allUser:"ERROR_IN_GETTING_USERS",
        proc_admin_get_countByUserDate:"ERROR_GET_LAST_SEVEN_DAYS_USER",
        proc_admin_update_status:"ERROR_UPDATING_STATUS",
        proc_admin_delete_user:"ERROR_DELETING_USER",
        proc_admin_get_searchResult:"ERROR_GET_SEARCH_RESULT"

    },

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
