# Android Head Unit OS UI System

A complete Android Head Unit OS UI system designed for Raspberry Pi deployment with full hardware integration capabilities.

## Features

- **Complete UI System**: 5 main pages (Home Dashboard, Maps Navigation, Apps Grid, Media Center, Settings)
- **Hardware Integration**: Backend APIs for vehicle controls, sensors, audio, Bluetooth, GPS, air conditioning
- **OpenStreetMap Integration**: Real-time navigation with Leaflet.js
- **Responsive Design**: Optimized for automotive tablet landscape orientation
- **Raspberry Pi Compatible**: Full-stack system ready for Pi deployment

## Project Structure

```
android-headunit-pi/
├── backend/
│   ├── server.js          # Express.js backend server
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Complete UI styling
│   ├── scripts.js         # Frontend JavaScript
│   └── pages/
│       ├── home.html      # Home Dashboard page
│       ├── maps.html      # Maps Navigation page
│       ├── apps.html      # Apps Grid page
│       ├── media.html     # Media Center page
│       └── settings.html  # Settings page
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Raspberry Pi OS (for hardware deployment)

### Setup

1. Clone or download the project files
2. Install backend dependencies:
   ```bash
   cd android-headunit-pi/backend
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/status` - Server status check
- `GET /api/weather` - Weather information
- `GET /api/vehicle/status` - Vehicle battery, range, gear status
- `GET/POST /api/aircon` - Air conditioning controls
- `GET /api/music/current` - Current playing music
- `POST /api/music/control` - Music player controls
- `GET /api/navigation/current` - Navigation information
- `GET /api/connectivity` - Bluetooth, WiFi, GPS status
- `GET /api/phone/status` - Phone connection status
- `GET/POST /api/settings` - System settings

## Pages Overview

### 1. Home Dashboard
- 3x4 widget grid layout
- Weather widget with location
- Tesla vehicle control widget
- Navigation preview widget
- Music player widget
- Vehicle status widget
- Air conditioning controls
- Connectivity status widgets
- Communication widgets

### 2. Maps Navigation
- OpenStreetMap integration with Leaflet.js
- Real-time navigation instructions
- Route planning and options
- Current location tracking
- Destination management

### 3. Apps Grid
- 6x2 app icon grid
- Social media apps (Facebook, Instagram, WhatsApp, etc.)
- Media apps (Spotify, YouTube, etc.)
- System apps (Call, Camera, etc.)
- Pagination controls

### 4. Media Center
- Media category selection (Music, Video, FM Radio, etc.)
- Now playing interface with album art
- Music controls (play, pause, next, previous, shuffle, repeat)
- Queue management
- Progress tracking

### 5. Settings
- Display and personalization settings
- Brightness control with auto-brightness toggle
- Theme selection (Dark, Light, Auto)
- Wallpaper customization
- Sleep timeout settings
- Refresh rate options
- Font size adjustment

## Hardware Integration

The system is designed for Raspberry Pi hardware integration:

- **GPIO Controls**: Vehicle systems, air conditioning
- **Audio System**: Music playback, volume control
- **Bluetooth**: Device connectivity and management
- **GPS Module**: Real-time location and navigation
- **Sensors**: Temperature, humidity, wind speed
- **Display**: Brightness control, sleep management

## Deployment on Raspberry Pi

1. Transfer the project to your Raspberry Pi
2. Install Node.js on the Pi:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Install project dependencies:
   ```bash
   cd android-headunit-pi/backend
   npm install
   ```

4. Set up auto-start service (optional):
   ```bash
   sudo nano /etc/systemd/system/headunit.service
   ```

5. Start the service:
   ```bash
   sudo systemctl enable headunit.service
   sudo systemctl start headunit.service
   ```

## Customization

- **Colors**: Modify the color palette in `styles.css`
- **Fonts**: Change the Livvic font family to your preferred font
- **Widgets**: Add or modify widgets in the home page
- **API Integration**: Extend backend APIs for additional hardware features
- **Maps**: Customize map styles and routing options

## Browser Compatibility

- Chrome/Chromium (recommended for Raspberry Pi)
- Firefox
- Safari
- Edge

## License

MIT License - Feel free to modify and distribute as needed.

## Support

This system provides a complete foundation for automotive head unit interfaces. All UI components and backend APIs are fully functional with mock data, ready for real hardware integration.
