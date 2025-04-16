const express = require('express');
const expenseRouter = express.Router();
const { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } = require('../controller/expenseController');

// Middleware to protect routes
const { protect } = require('../middlewares/authMiddleware');
// Route to create a new expense
expenseRouter.post('/', protect, createExpense);
// Route to get expenses by user
expenseRouter.get('/expenseByID', protect, getExpenseById);
// Route to get all expenses
expenseRouter.get('/', protect, getExpenses);

module.exports = expenseRouter;