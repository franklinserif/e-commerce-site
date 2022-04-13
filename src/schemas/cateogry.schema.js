const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.require();
  image: image.require();
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image
});

const getCategorySchema = Joi.object({
  id: id.require();
});


module.exports = {createCategorySchema, updateCategorySchema, getCategorySchema}