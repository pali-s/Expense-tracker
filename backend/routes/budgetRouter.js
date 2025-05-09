const express = require('express');
const budgetRouter = express.Router();
const { createBudget, getBudgetById, updateBudgetById } = require('../controller/budgetController');

// Middleware to protect routes
const { protect } = require('../middlewares/authMiddleware');
// Route to create a new budget
budgetRouter.post('/', protect, createBudget);
// Route to get budgets by user
budgetRouter.get('/budgetByID', protect, getBudgetById);
// Route to get all budgets
budgetRouter.put('/updateBudget', protect, updateBudgetById);

module.exports = budgetRouter;