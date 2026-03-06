const fs = require('fs');
const path = require('path');

// Manually load .env file
const envPath = path.resolve(__dirname, '.env');
console.log('Looking for .env at:', envPath);

if (fs.existsSync(envPath)) {
  // Read and remove BOM if present
  let envConfig = fs.readFileSync(envPath, 'utf-8');
  // Remove BOM character if present
  if (envConfig.charCodeAt(0) === 0xFEFF) {
    envConfig = envConfig.slice(1);
  }
  console.log('ENV file content:', envConfig);
  
  envConfig.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    }
  });
}

// Debug: Check if env is loaded
console.log('ENV Loaded - MONGODB_URI:', process.env.MONGODB_URI);
console.log('ENV Loaded - EMAIL_USER:', process.env.EMAIL_USER);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5001;
const ProjectRouter = require('./routes/projectRoutes.js');
const SettingsRouter = require('./routes/settingRoutes.js');
const PaymentRouter = require('./routes/paymentRoutes.js');
const authRouter = require('./routes/authRoutes.js');

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/projects', ProjectRouter);
app.use('/api/settings', SettingsRouter);
app.use('/api/payments', PaymentRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});

