const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer();

const getOderSchema = Joi.object({
  id: id.require(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.require(),
});

const addItemSchema = Joi.object({
  orderId: orderId.require(),
  productId: productId.require(),
  amount: amount.require(),
});

module.exports = { getOderSchema, createOrderSchema, addItemSchema };
