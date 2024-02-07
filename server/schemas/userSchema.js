const Joi = require('joi');

const signUpSchema = Joi.object({
  firstName: Joi.string().required().max(20).min(3).messages({
    "string.base": `FirstName should be string`,
    "string.empty": `FirstName cannot be an empty field`,
    "any.required": `FirstName is a required field`,
    "string.min": `FirstName should have a minimum length of 3`,
    "string.max": `FirstName characters limit cannnot more than 20`,
  }),
  emailId: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
    "string.base": `email should be string`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `email is a required field`,
  }),
  authProvider: Joi.string().valid('traditional', 'google').required().messages({
    "string.base": `authProvider should be string`,
    "string.empty": `authProvider cannot be an empty field`,
    "any.required": `authProvider is a required field`,
  }),
  password: Joi.string().when('authProvider', {
    is: 'traditional',
    then: Joi.string().required().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/).messages({
        "string.base": `Password should be string`,
        "string.empty": `Password cannot be an empty field`,
        "any.required": `Password is a required field`,
        "string.min": `Password should have a minimum length of 8`,
        "string.max": `Password characters limit cannnot more than 20`,
        'string.pattern.base': 'Password must meet the following requirements: '
        + '- At least 8 characters long '
        + '- Contain at least one lowercase letter '
        + '- Contain at least one uppercase letter '
        + '- Contain at least one digit '
        + '- Contain at least one special character (@$!%*?&#)'
    }), 
    otherwise: Joi.string().allow(''),  
  }),
  profileImage : Joi.string().allow('')
})

const signInSchema = Joi.object({
  emailId: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
    "string.base": `email should be string`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `email is a required field`,
  }),
  authProvider: Joi.string().valid('traditional', 'google').required().messages({
    "string.base": `authProvider should be string`,
    "string.empty": `authProvider cannot be an empty field`,
    "any.required": `authProvider is a required field`,
  }),
  password: Joi.string().when('authProvider', {
    is: 'traditional',
    then: Joi.string().required().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/).messages({
        "string.base": `Password should be string`,
        "string.empty": `Password cannot be an empty field`,
        "any.required": `Password is a required field`,
        "string.min": `Password should have a minimum length of 8`,
        "string.max": `Password characters limit cannnot more than 20`,
        'string.pattern.base': 'Password must meet the following requirements: '
        + '- At least 8 characters long '
        + '- Contain at least one lowercase letter '
        + '- Contain at least one uppercase letter '
        + '- Contain at least one digit '
        + '- Contain at least one special character (@$!%*?&#)'
    }), 
    otherwise: Joi.string().allow(''),  
  }),
})

module.exports ={
    signUpSchema,
    signInSchema
}