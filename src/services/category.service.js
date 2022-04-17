const boom = require('@hapi/boom');
const faker = require('faker');

class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index += 1) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.categories.push(newCategory);
    return data;
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    const categoryFound = this.categories.find(
      (category) => category.id === id,
    );

    if (!categoryFound) throw boom.notFound('Category not found');
    return categoryFound;
  }

  async update(id, changes) {
    const categoryIndex = this.category.findIndex(
      (category) => category.id === id,
    );

    if (!categoryIndex === -1) throw boom.notFound('Category not found');

    const category = this.categories[categoryIndex];

    this.categories[categoryIndex] = {
      ...category,
      ...changes,
    };

    return this.categories[categoryIndex];
  }

  async delete(id) {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    );

    if (!categoryIndex) throw boom.notFound('category not found');

    this.categories.splice(categoryIndex, 1);
    return { id };
  }
}

module.exports = CategoryService;
