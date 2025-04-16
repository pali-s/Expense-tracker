const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: String,
    description: String,
    amount: Number,
    date: {
        type: Date,
        default: Date.now,
    },
    category: {
        type:String,
        required:true,
        Enum :["Food", "Transport", "Entertainment", "Utilities", "Others"],
        ref: 'Category',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);