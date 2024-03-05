(function () {
    'use strict'
    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');
    const constants = require('./constants');
    const jsonResponse = require('../utility/jsonResponse');

    var generics = () => {

        return {
            errorFunc: function (data) {
                return {
                    "message": data
                };
            },

            checkEmptyNull: function (object, data, errfun) {
                if (data === undefined || data === "" || data === null) {
                    var message;
                    message = this.errorFunc(object + " is missing");
                    errfun(message);
                    return true
                }
                return false
            },

            checkPasswordRequired: function (object, data, authProvider,errfun) {
              if (authProvider === 'traditional' && (data === undefined || data === "")) {
                  var message;
                  message = this.errorFunc(object + " is missing");
                  errfun(message);
                  return true
              }
              return false
          },


            generateTokenLink: function (data) {
                var token = jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME
                });
                return token
            },

            inputparams: function (paramName, dataType, value) {
                return {
                    "node": paramName,
                    "dataType": dataType,
                    "value": value
                }
            },

            encrypt: function (pwd) {
                return (crypto.createHash('sha256').update(pwd).digest('base64'));
            },

             MediaExtractor : async (data)=>{
             const output_data = [];
             let challenge,creator,media
              data.forEach((item)=>{
                challenge = JSON.parse(item['challenge'])
                creator = JSON.parse(item['creator'])
                media = JSON.parse(item['media'])    
                          
                let foundChallenge = output_data.find(obj => obj?.challenge?.id === challenge?.id);
                  if (!foundChallenge) {
                      foundChallenge = {
                          challenge: {
                              id: challenge.id,
                              title: challenge.title,
                              desc: challenge.description,
                              noOfLikes: item.likes_count,
                              noOfComments: item.comments_count,
                              totalCount:item.total_count,
                              noOfShares: "0",
                              isAlreadySaved: item.isSaved,
                              isAlreadyJoined: false,
                              isAlreadyLiked:item.isLiked,
                              startDate: challenge.startDate,
                              endDate: challenge.endDate,
                              startTime: challenge.startTime,
                              endTime:challenge.endTime,
                              timerCounter: challenge.timerCounter,
                              units: challenge.units
                          },
                          creator: {
                              id: creator.id,
                              name: creator.name,
                              profilePicUrl: creator.profilePicUrl,
                              location: creator.location,
                              isFollowed: creator.isFollow
                          },
                          media: [],
                          comments:item.latest_comments
                      };
                      output_data.push(foundChallenge);
                  }
              
                  foundChallenge.media.push({
                      id: media?.id,
                      type: media?.type,
                      thumb: media?.thumbnail_url,
                      original:media?.original_url
                  });
              })
              
              return output_data
              
              },

            validator : (data, schema,errFn)=>{
            var reqB = JSON.stringify(data);
            var reqBody = JSON.parse(reqB);
            const { error } = schema.validate(reqBody);
            if (error) {
              var message =
                error?.details?.length && error.details[0].message
                  ? error.details[0].message
                  : "Missing Fields";
              const response = {
                message: message,
              };
              errFn(response);
              return true;
            }
            return false
        },

        addMediaInChallenges : async (data)=>{
          const output_data = [];
          let media
           data.forEach((item)=>{
             media = JSON.parse(item['media'])
             
             let foundChallenge = output_data.find(obj => obj.id === item.id);
               if (!foundChallenge) {
                   foundChallenge = {
                      ...item,
                       media: []
                   };
                   output_data.push(foundChallenge);
               }
           
               foundChallenge.media.push({
                   id: media?.id,
                   type: media?.type,
                   thumb: media?.thumbnail_url,
                   original:media?.original_url
               });
           })
           
           return output_data
           
           },
      }
    };
    module.exports = generics();
})();