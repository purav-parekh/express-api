import express from "express";
const router = express.Router();

router.get("/", (req, res, nextFn) => {
	res.status(200).json({
		message: "GET all orders",
	});
});

router.post("/", (req, res, nextFn) => {
	const orderDetails = {
		productId: req.body.productId,
		quantity: req.body.quantity,
	};
	res.status(201).json({
		message: "Order POSTed",
		order: orderDetails,
	});
});

router.get("/:orderID", (req, res, nextFn) => {
	const id = req.params.orderID;
	res.status(200).json({
		message: "Order details",
		id,
	});
});

router.delete("/:orderID", (req, res, nextFn) => {
	const id = req.params.orderID;
	res.status(200).json({
		message: "Order deleted",
		id,
	});
});

export default router;
