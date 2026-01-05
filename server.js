const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);  // Optional: exit app if DB connection fails
});

// Mount your routes
const contactRouter = require('./routes/contact');
app.use('/api/contact', contactRouter);

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const serverless = require('serverless-http'); // <-- added
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch(err => {
//   console.error('MongoDB connection error:', err);
//   process.exit(1);
// });

// // Mount your routes
// const contactRouter = require('./routes/contact');
// app.use('/api/contact', contactRouter);

// const chatRoutes = require('./routes/chatRoutes');
// app.use('/api/chat', chatRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend is running ✅");
// });

// // Only use app.listen in local development
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

// // Export for Vercel Serverless
// module.exports = app;
// module.exports.handler = serverless(app); // <-- new line
