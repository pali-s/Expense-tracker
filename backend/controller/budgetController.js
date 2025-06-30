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
        const budgets = await Budget.find({user:req.user.id,isActive:true});
        if (!budgets) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBudgetById = async (req, res) => {
    const { amount, startDate, duration } = req.body;
    const userId = req.user.id;

    // ✅ Validate duration format
    const validUnits = ['day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years'];
    const [value, unit] = duration.split(' ');

    if (isNaN(parseInt(value)) || !validUnits.includes(unit)) {
        return res.status(400).json({
            message: 'Invalid duration format. Use formats like "1 week", "2 months", etc.'
        });
    }

    try {
        // ✅ Step 1: Archive old budget
        await Budget.updateOne(
            { user: userId, isActive: true },
            { isActive: false }
        );

        // ✅ Step 2: Create new budget (endDate will be auto-calculated in schema)
        const newBudget = await Budget.create({
            user: userId,
            amount,
            startDate,
            duration,
            isActive: true
        });

        // ✅ Step 3: Send success response
        return res.status(200).json({
            message: 'Budget updated successfully',
            budget: newBudget,
        });
    } catch (error) {
        console.error('Error updating budget:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//to get most recent budget
exports.getMostRecentBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({
            user: req.user.id,
            isActive: false
        }).sort({ endDate: -1 }); // most recently ended budget

        if (!budget) {
            return res.status(404).json({ message: 'No expired budgets found' });
        }

        res.status(200).json(budget);
    } catch (error) {
        console.error('Error fetching most recent expired budget:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
