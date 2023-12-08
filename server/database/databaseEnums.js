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
        proc_getuser_detail:'proc_getuser_detail'


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
        proc_getuser_detail:'GETUSER_DETAIL_ERROR'

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