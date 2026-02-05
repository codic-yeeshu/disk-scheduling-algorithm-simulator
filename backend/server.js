const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Disk Scheduling API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
