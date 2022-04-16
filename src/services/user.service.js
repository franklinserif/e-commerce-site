const faker = require('faker');
const boom = require('@hapi/boom');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
  }
  async create(user) {
    this.users.push(user);
    return user;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw boom.notFound('User not found');

    return user;
  }

  async update(id, changes) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) throw boom.notFound('User not found');

    const user = this.users[userIndex];

    this.users[userIndex] = {
      ...user,
      ...changes,
    };
  }

  async delete(id) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) throw boom.notFound('User not found');

    this.users.splice(userIndex, 1);
    return { id };
  }
}

module.exports = UserService;
