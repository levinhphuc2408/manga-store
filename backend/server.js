const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
credentials: true
}));

app.use(express.json()); // for req.body
app.use('/api/auth', require('./routes/auth'));
app.use('/api/manga', require('./routes/manga'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/order', require('./routes/order'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
