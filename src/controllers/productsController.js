const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {listProducts : products})
	},
	// Detail - Detail from one product
	detail: (req, res) => {
		let product = []
		product = products.filter(function(productElement){
			if(productElement.id == req.params.id){
				productElement["finalPrice"] = toThousand(productElement.price - (productElement.price * productElement.discount / 100))
				return true}
		})
		res.render('detail', {productDetail : product[0]})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let productsFile = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let newProductID = products[products.length-1].id + 1
		const newProduct = {
			id: newProductID,
			name: req.body.name,
			price: parseFloat(req.body.price),
			discount: parseFloat(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			Image: ""
		}
		productsFile.push(newProduct)
		productsFile = JSON.stringify(productsFile)
		fs.writeFileSync(productsFilePath, productsFile)
		newProduct["finalPrice"] = toThousand(newProduct.price - (newProduct.price * newProduct.discount / 100))
		res.render('detail', {productDetail : newProduct})
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = []
		product = products.filter(function(productElement){
			if(productElement.id == req.params.id){
				productElement["finalPrice"] = toThousand(productElement.price - (productElement.price * productElement.discount / 100))
				return true}
		})
		//let idUser = req.params.idUser
		res.render('product-edit-form', {productEditing : product[0]})
	},
	// Update - Method to update
	update: (req, res) => {
		//Leo el archivo en nuevo array
		let productsEdited = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let productEdited = {}
		productsEdited = productsEdited.map(function(productElement){
			if(productElement.id == req.params.id){
				if(req.body.name != ''){productElement.name = req.body.name}
				if(req.body.description != ''){productElement.description = req.body.description}
				if(req.body.price != ''){productElement.price = parseFloat(req.body.price)}
				if(req.body.discount != ''){productElement.discount = parseFloat(req.body.discount)}
				productElement.image = ''
				if(req.body.category != ''){productElement.category = req.body.category}
			}
			productEdited = productElement
			return productElement
		})
		productsEdited = JSON.stringify(productsEdited)
		fs.writeFileSync(productsFilePath, productsEdited)
		productEdited["finalPrice"] = toThousand(productEdited.price - (productEdited.price * productEdited.discount / 100))
		res.render('detail', {productDetail : productEdited})
	},

	// Delete - Delete one product from DB

	// revisar el destroy. le falta.
	destroy : (req, res) => {
		let productsRemaining = []
		productsRemaining = products.filter(function(productElement){
			if(productElement.id != req.params.id){return true}else{return false}
		})
		productsRemaining = JSON.stringify(productsRemaining)
		fs.writeFileSync(productsFilePath, productsRemaining)		
		res.redirect('../../..')
	}
};

module.exports = controller;