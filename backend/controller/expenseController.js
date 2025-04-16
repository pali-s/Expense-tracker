const Expense = require('../model/expense');

exports.createExpense = async (req, res) => {
    try {
        const { title, description, amount, date, category } = req.body;
        const userId = req.user.id; // Assuming you have user ID from authentication middleware
        const expense = new Expense({
            title,
            description,
            amount,
            date,
            category,
            user: userId,
        });
        await expense.save();
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
        const expense = await Expense.find({user:req.user.id});
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error('Error fetching expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}