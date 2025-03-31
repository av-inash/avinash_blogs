import { Joi } from "celebrate";


let user = {
  SIGNUP: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    profilePicture:Joi.string().required(),
    password: Joi.string().required(),
    
  }),


  LOGIN: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    
  }),
  CREATE_BLOG:Joi.object().keys({
    title:Joi.string().required(),
    content:Joi.string().required()
  }),

  UPDATE_BLOG:Joi.object().keys({
    blogId:Joi.string().required(),
    title:Joi.string().optional(),
    content:Joi.string().optional()

  }),
  CREATE_COMMENT:Joi.object().keys({
    blogId:Joi.string().required(),
    text:Joi.string().required(),

  }),
  REPLY_COMMENT:Joi.object().keys({
    commentId:Joi.string().required(),
    text:Joi.string().required()

  })

};

export default user;
