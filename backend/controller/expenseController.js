const Expense = require('../model/expense');
const mongoose = require('mongoose');

exports.createExpense = async (req, res) => {
    try {
        const { title, description, amount, date, category,type } = req.body;
        const userId = req.user.id; // Assuming you have user ID from authentication middleware
        const expense = new Expense({
            title,
            description,
            amount,
            date,
            category,
            type,
            user: userId,
        });
        await expense.save();
        console.log('saved expense:', expense);
        res.status(201).json({ message: 'Expense created successfully' });
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.find({ user: req.user.id });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error('Error fetching expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getTotalExpense = async (req, res) => {
    try {
        const userId = req.user.id;

        const totalExpense = await Expense.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' },
                },
            },
        ]);

        const total = totalExpense.length > 0 ? totalExpense[0].total : 0;

        res.status(200).json({total});
    } catch (error) {
        console.error('Error fetching total expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getExpenseByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const expenses = await Expense.find({ category });
        if (!expenses) {
            return res.status(404).json({ message: 'No expenses found for this category' });
        }
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses by category:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, amount, date, category } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(id, {
            title,
            description,
            amount,
            date,
            category,
        }, { new: true });
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting expense with ID backend:', id);
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
