const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter');
const expenseRouter = require('./routes/expenseRouter');
const budgetRouter =require('./routes/budgetRouter');
const database = require('./config/database');
dotenv.config();

port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Connect to the database
database();

app.use('/api/auth', authRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/budget', budgetRouter);


app.listen(port,"0.0.0.0", () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});


