const boom = require("@hapi/boom");
const faker = require("faker");

class OrderService {
	constructor() {
		this.orders = [];
	}

	async create(order) {
		const newOrder = {
			id: faker.datatype.uuid(),
			...order,
		};
		this.orders.push(newOrder);
		return order;
	}

	async find() {
		return this.orders;
	}

	async findOne(id) {
		const order = this.orders.find((order) => order.id === id);

		if (!order) throw boom.notFound("Order not found");
		return order;
	}

	async update(id, changes) {
		const orderIndex = this.orders.findIndex((order) => order.id === id);
		if (!orderIndex === -1) throw boom.notFound("Order not found");

		this.orders[orderIndex].push(changes);

		return this.orders[orderIndex];
	}

	async delete(id) {
		const orderIndex = this.orders.findIndex((order) => order.id === id);

		if (!orderIndex) throw boom.notFound("Order not found");

		this.orders.splice(orderIndex, 1);
		return { id };
	}
}

module.exports = OrderService;
