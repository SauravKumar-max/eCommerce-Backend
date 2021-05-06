const faker = require('faker');

const productsData = [...Array(60)].map(() => ({
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
	brand: faker.lorem.word(),
	inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
	quantity: 1,
  ratings: faker.random.arrayElement([
		1,
		1.5,
    2,
    2.5,
  	3,
    3.5,
    4,
    4.5,
    5
  ]),
	offer: faker.random.arrayElement([
  	"Save 50",
		"70% bonanza",
  	"Republic Day Sale"
  ]),

}));

const cart = [];
const wishlist = [];
const categories = [];

const data = {cart , wishlist ,categories, productsData}

module.exports = productsData;