const express = require('express');
const expenseRouter = express.Router();
const { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense,getTotalExpense, getExpenseByCategory } = require('../controller/expenseController');

// Middleware to protect routes
const { protect } = require('../middlewares/authMiddleware');
// Route to create a new expense
expenseRouter.post('/', protect, createExpense);
// Route to get expenses by user
expenseRouter.get('/expenseByID', protect, getExpenseById);
// Route to get total expense
expenseRouter.get('/totalExpense', protect, getTotalExpense);
// Route to get expenses by category
expenseRouter.get('/category/:category', protect, getExpenseByCategory);
// Route to update an expense
expenseRouter.put('/:id', protect, updateExpense);
// Route to delete an expense
expenseRouter.delete('/:id', protect, deleteExpense);
// Route to get all expenses
expenseRouter.get('/', protect, getExpenses);

module.exports = expenseRouter;