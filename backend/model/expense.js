const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {type:String,required:true},
    description: String,
    amount: {type:Number,required:true},
    date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'],
    },
    category: {
        type:String,
        required:true,
        enum :["Food", "Transport", "Entertainment", "Utilities", "Others"],
        ref: 'Category',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

expenseSchema.pre('save', function (next) {
    console.log(`[PRE-SAVE HOOK] Original amount: ${this.amount}, Type: ${this.type}`);
    if (this.type === 'income') {
        this.amount = -Math.abs(this.amount); // store income as negative
    } else if (this.type === 'expense') {
        this.amount = Math.abs(this.amount); // store expense as positive
    }
    console.log(`[PRE-SAVE HOOK] Adjusted amount: ${this.amount}`);
    next();
});

module.exports = mongoose.model('Expense', expenseSchema);