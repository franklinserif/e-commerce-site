const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return data;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) throw boom.notFound('Product not found');
    if (!product.isBlock) throw boom.conflict('Product is block');
    return product;
  }

  async update(id, changes) {
    const productIndex = this.product.findIndex((product) => product.id === id);
    if (!productIndex === -1) throw boom.notFound('Product not found');

    const product = this.products[productIndex];

    this.products[productIndex] = {
      ...product,
      ...changes,
    };

    return this.products[productIndex];
  }

  async delete(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    if (!productIndex) throw boom.notFound('Product not found');

    this.products.splice(productIndex, 1);
    return { id };
  }
}

module.exports = ProductsService;
