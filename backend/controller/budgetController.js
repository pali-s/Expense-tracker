const Budget=require('../model/budget');

exports.createBudget = async (req, res) => {
    try {
        const { amount, startDate, duration } = req.body;
        const userId = req.user.id; // Assuming you have user ID from authentication middleware

        // Validate input
        const validUnits = ['day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years'];
        const [value, unit] = duration.split(' ');

        if (isNaN(parseInt(value)) || !validUnits.includes(unit)) {
            return res.status(400).json({ message: 'Invalid duration format. Use formats like "1 week", "2 months", etc.' });
        }


        const newBudget = new Budget({
            amount,
            startDate,
            duration,
            user: userId,
        });
        await newBudget.save();
        res.status(201).json({
            message: 'Budget created successfully',
            budget: newBudget,
        });
        } catch (error) {
        console.error('Error creating budget:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBudgetById = async (req, res) => {
    try {
        const budgets = await Budget.find({user:req.user.id});
        if (!budgets) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

