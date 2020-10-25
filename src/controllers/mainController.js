const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let listOfVisitedProducts = products.filter(function(product){
			if(product.category == 'visited'){
				product.price = toThousand(product.price - (product.price * product.discount / 100))
				return true}})
		
		let listOfInSaleProducts = products.filter(function(product){
			if(product.category == 'in-sale'){
				product.price = toThousand(product.price - (product.price * product.discount / 100))
				return true}})
		
		let listProducts = {'visited' : listOfVisitedProducts,
							'inSale' : listOfInSaleProducts}
		res.render('index', {listProducts : listProducts})
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
