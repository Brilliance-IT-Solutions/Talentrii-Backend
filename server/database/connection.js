const responseBack = require('../utility/jsonResponse');
const { procedureEnum,procedureEnumAdmin } = require('./databaseEnums');

var sqlDb = () => {
    'use strict';

    var mysql = require('mysql2');
    const constants = require('../utility/constants')
    const config = require('./configuration');

    return {
        connectDb: async (req, errFn, procName, inputObject, errorTitle, responseBack) => {
            const func = require('../utility/genericFunctions');

            var connection = mysql.createConnection(config);
            connection.connect(async function (err) {
                if (err) throw errroFunc(err);
                // if (err) {
                //     errroFunc(err);
                //     return;
                // }
                let params = "",
                    counter = 0;
                inputObject.forEach(async element => {
                    if (typeof element.value === 'string') {
                        let d = JSON.stringify(element.value)
                        let search = d.replace(/(^"|"$)/g, '');
                        element.value = search
                    }
                    if(element.value === null || element.dataType === "Bit"){
                        (counter == 0) ? params = '"' + element.value + '"' : params = params + ' , ' + '' + element.value + ''
                    }else{
                        (counter == 0) ? params = '"' + element.value + '"' : params = params + ' , ' + '"' + element.value + '"'
                    }
                    counter += 1
                })
                if((procName !== procedureEnum.proc_post_login && procName !== procedureEnum.proc_post_signUp && !procName.startsWith("proc_admin"))){
                    try {
                        const {statusResult, statusReason}= await checkUserStatus(connection,req.user?.id,procedureEnum.proc_get_userStatus)
                        if(statusResult === 1){
                            connection.query(`${"CALL " + procName + "(" + params + ")"}`, (err, result) => {
                               if (err) throw errroFunc(err);
                                // if (err) {
                                //     errroFunc(err);
                                //     return;
                                // }
                                responseBack(result)
                                connection.end();
            
                            });
                        }
                        else if(statusResult === 2){  
                           errroFunc({message:statusReason})
                        }
                        else if(statusResult === 3){
                           errroFunc({message:statusReason})
                        }else{
                            errroFunc({message:statusReason})
                        }
        
                    } catch (error) {
                        return errroFunc(error)
                    }
            }
            else{
                connection.query(`${"CALL " + procName + "(" + params + ")"}`, (err, result) => {
                    if (err) throw errroFunc(err);
                     // if (err) {
                     //     errroFunc(err);
                     //     return;
                     // }
                     responseBack(result)
                     connection.end();
 
                 });
            }
        })
            function errroFunc(err) {
                var message = func.errorFunc(err.message || "Err");
                errFn(message);
                connection.end();
            }
        }
    }
}


async function checkUserStatus(connection,userId,procedure){
    let statusResult, statusReason
    if(userId){
    return new Promise((resolve, reject) => {
    connection.query(`${"CALL " + procedure + "(" + userId + ")"}`, (err, result) => {
        if (err) throw err;
       if(result[0][0]?.status){
        statusResult = result[0][0].status
        statusReason = result[0][0].statusReason
        return resolve({statusResult,statusReason})
       }
       return reject({message:"userId doesn't exists"})
     });
    })
}else{
    connection.end()
    return {error:"userId missing"}
}
}
module.exports = sqlDb();