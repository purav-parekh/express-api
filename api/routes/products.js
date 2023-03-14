import express from "express";
import products from "../../data/products.json" assert { type: "json" };

const router = express.Router();

let allProducts = products.products;

router.get("/", (req, res) => {
	const page = +req.query.page || 1;
	const limit = +req.query.limit || 5;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const results = {};
	// res.set("Content-Type", "application/javascript");

	if (endIndex < allProducts.length) {
		results.next = {
			page: page + 1,
			limit: limit,
		};
	}

	if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit: limit,
		};
	}

	results.prods = allProducts.slice(startIndex, endIndex);

	res.status(200).json({
		data: results,
	});
});

router.put("/", (req, res) => {
	const id = allProducts[allProducts.length - 1].id + 1;
	const product = {
		id,
		title: req.body.name,
		price: req.body.price,
	};
	res.status(201).json({
		message: "PUT products endpoint",
		product,
	});

	// this line adds data to the existing JSON file
	allProducts.push(product);
});

router.get("/:productID", (req, res) => {
	const id = req?.params?.productID;
	const product = allProducts.find((obj) => obj.id === +id);

	if (product) {
		res.status(200).json({
			data: product,
		});
	} else {
		res.status(404).json({
			message: "Requested resource is not found",
		});
	}
});

router.patch("/:productID", (req, res) => {
	const id = req.params.productID;
	if (id) {
		res.status(200).json({
			message: `Product with id=${id} patched`,
		});
	} else {
		res.status(404).send();
	}
});

router.delete("/:productID", (req, res) => {
	const id = req.params.productID;
	const prodIndex = allProducts.findIndex((prod) => prod.id === id);
	console.log(prodIndex);
	if (prodIndex !== -1) {
		res.status(204).json({
			message: `Product with id=${id} deleted - ${prodIndex}`,
		});
	} else {
		res.status(404).send();
	}
});
export default router;
