import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  countTotalOrders,
  calculateTotalSales,
  findOrderById,
} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/:id").get(authenticate, findOrderById);

export default router;
