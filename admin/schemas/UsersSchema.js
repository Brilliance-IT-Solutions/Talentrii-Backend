const Joi = require("joi").extend(require('@joi/date'));

const getAllUsersSchema = Joi.object({
    userId: Joi.number().required(),
    page: Joi.number().integer().min(1).required().messages({
        "any.required": `page is a required field`,
      }),  
      pageSize: Joi.number().integer().min(1).required().messages({
        "any.required": `pageSize is a required field`,
      })
})

const updateUserStatus = Joi.object({
  userId: Joi.number().required(),
  status:Joi.number().valid(1,2,3,4).required(),
  statusReason:Joi.string().when("status",{
     is:1,
     then:Joi.string().allow('',null),
    
     otherwise : Joi.string().required()
  }
  ),
})

const getCountByDateSchema = Joi.object({
  userId: Joi.number().required(),
  startDate:Joi.date().format('YYYY-MM-DD').required(),
  endDate:Joi.date().format('YYYY-MM-DD').required()
})

module.exports ={
    getAllUsersSchema,
    updateUserStatus,
    getCountByDateSchema
}