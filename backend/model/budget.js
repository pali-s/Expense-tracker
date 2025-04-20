const mongoose = require('mongoose');
const moment = require('moment');

const budgetSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

// Middleware to calculate endDate based on startDate and duration
budgetSchema.pre('validate', function (next) {
    if (this.startDate && this.duration) {
        const [value, unit] = this.duration.split(' '); // e.g. '1 week' => ['1', 'week']
        this.endDate = moment(this.startDate).add(parseInt(value), unit).toDate();
    }
    next();
})
module.exports = mongoose.model('Budget', budgetSchema);