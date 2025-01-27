const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const AuthRouter = require('./Router/AuthRouter')
const app = express();

const port = 3200;

// Middleware to parse JSON
app.use(express.json());
app.use(morgan('dev'));
// MongoDB connection string
const mongoURI = "mongodb+srv://kansalrijul:aFX2w8hC6jw2i1jC@cluster0.jbige.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

// Basic rout
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/v1/authentication',AuthRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

