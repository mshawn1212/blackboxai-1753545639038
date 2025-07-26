import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Sample API endpoint to check server status
app.get('/api/status', (req, res) => {
  res.json({ status: 'Backend server is running' });
});

// Weather API endpoint
app.get('/api/weather', (req, res) => {
  const { location = 'Dhaka, Bangladesh' } = req.query;
  res.json({
    location,
    temperature: 29,
    condition: 'partly cloudy',
    humidity: 65,
    windSpeed: 12
  });
});

// Vehicle status API endpoint
app.get('/api/vehicle/status', (req, res) => {
  res.json({
    batteryLevel: 85,
    range: 530,
    charging: true,
    distanceTravelled: 2200,
    gear: 'D',
    mode: 'Regular'
  });
});

// Air conditioning API endpoint
app.get('/api/aircon', (req, res) => {
  res.json({
    temperature: 17.5,
    fanSpeed: 'Mid',
    timer: '3hrs',
    power: true
  });
});

app.post('/api/aircon', (req, res) => {
  const { temperature, fanSpeed, timer, power } = req.body;
  // Mock response - in real implementation, this would control actual hardware
  res.json({
    success: true,
    temperature: temperature || 17.5,
    fanSpeed: fanSpeed || 'Mid',
    timer: timer || '3hrs',
    power: power !== undefined ? power : true
  });
});

// Music player API endpoints
app.get('/api/music/current', (req, res) => {
  res.json({
    title: 'Taki Taki',
    artist: 'DJ Snake',
    album: 'Taki Taki',
    duration: 335, // 5:35 in seconds
    currentTime: 95, // 1:35 in seconds
    isPlaying: true
  });
});

app.post('/api/music/control', (req, res) => {
  const { action } = req.body; // play, pause, next, previous, shuffle, repeat
  res.json({
    success: true,
    action,
    isPlaying: action === 'play'
  });
});

// Navigation API endpoints
app.get('/api/navigation/current', (req, res) => {
  res.json({
    destination: 'No 412 north city road',
    distance: '7 km',
    duration: '12 min',
    nextTurn: 'Take a right turn',
    nextTurnDistance: '2.3 miles',
    currentLocation: {
      lat: 37.7749,
      lng: -122.4194,
      address: '6391 Elgin St. Celina, Delaware 10299'
    }
  });
});

// Connectivity status API endpoints
app.get('/api/connectivity', (req, res) => {
  res.json({
    bluetooth: {
      enabled: true,
      connected: true,
      deviceName: 'iPhone 12'
    },
    wifi: {
      enabled: true,
      connected: true,
      ssid: 'HomeNetwork'
    },
    gps: {
      enabled: true,
      signal: 'strong'
    }
  });
});

// Phone API endpoints
app.get('/api/phone/status', (req, res) => {
  res.json({
    connected: true,
    signal: 4,
    carrier: 'Verizon',
    battery: 78
  });
});

// Settings API endpoints
app.get('/api/settings', (req, res) => {
  res.json({
    brightness: 60,
    autoBrightness: false,
    theme: 'dark',
    wallpaper: 'default',
    sleep: '30 sec',
    refreshRate: '120 Hz',
    fontSize: 'medium'
  });
});

app.post('/api/settings', (req, res) => {
  const settings = req.body;
  // Mock response - in real implementation, this would save to persistent storage
  res.json({
    success: true,
    settings
  });
});

// Serve the main HTML file for all routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log(`Frontend available at http://localhost:${port}`);
});
