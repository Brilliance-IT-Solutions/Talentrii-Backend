const statusCode = require("http-status-codes");
const sqlConnect = require("../../database/connection");
const genericFunc = require("../../utility/genericFunctions");
const jsonResponse = require("../../utility/jsonResponse");
const {
  dataTypeEnum,
  procedureEnum,
  errorEnum,
} = require("../../database/databaseEnums");
const { mutualFriendSchema } = require("../../schemas/followersSchema");


const getMutualFriendsDataDB = () => {
  return {
    getMutualFriendsDataDB: async (req, res, next) => {
      const successFn = (result) => {
        jsonResponse.successHandler(res, next, result);
      };
      const errFn = (err, statusCode) => {
        jsonResponse.errorHandler(res, next, err, statusCode);
      };
      
      req.query.requestedByUser = req.user.id
        if(genericFunc.validator(req.query,mutualFriendSchema,errFn) == true)
        return;

      const inputObject = [
        genericFunc.inputparams("requestedByUserId", dataTypeEnum.varChar, req.user.id),
        genericFunc.inputparams("userId", dataTypeEnum.varChar, req.query.userId),
      ];

      sqlConnect.connectDb(
        req,
        errFn,
        procedureEnum.proc_mutualFriends,
        inputObject,
        errorEnum.proc_mutualFriends,
        async function (result) {
          if (result.length > 0) {
            if (result[0]) {
              let data = result[0];
               if(data && data.length > 0 && (data[0].message = "Mutual Friend Success")){

              // Map the array to create an array of images
              const firstTwoImages = data.slice(0, 2);
              const firstTwoImage = firstTwoImages.map((obj) => ({
                key: obj.userProfile,
              }));
              // Display up to the first two objects
              const firstTwoObjects = data.slice(0, 2);
              const firstTwoStrings = firstTwoObjects.map(
                (obj) => `${obj.userName}`
              );

              // Display the count of remaining objects
              const remainingCount = Math.max(0, data.length - 2);
              const remainingString =
                remainingCount > 0 ? ` and ${remainingCount} others` : "";

              // Combine the strings
              const resultString = `${firstTwoStrings}${remainingString}`;

              let obj = {
                message: data[0].message,
                images: firstTwoImage,
                data: resultString ? `Followed By ${resultString}` : "",
              };

              successFn(obj);
            }else{
              response = {
                message: "No Mutual friends",
                data:[],
                images:[]
              };
              errFn(response, statusCode.StatusCodes.UNAUTHORIZED);
            }
            } else {
              response = {
                message: data.message,
              };
              errFn(response, statusCode.StatusCodes.UNAUTHORIZED);
            }
          }
        }
      );
    }
  };
};

module.exports = getMutualFriendsDataDB();
