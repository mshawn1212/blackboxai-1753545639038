// Android Head Unit OS UI System - Frontend JavaScript

document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const appContainer = document.getElementById('app');

  // Update time and date in status bar
  function updateDateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    const periodElement = document.getElementById('current-period');
    const dateElement = document.getElementById('current-date');

    if (timeElement && periodElement && dateElement) {
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const displayHours = hours % 12 || 12;
      
      timeElement.textContent = `${displayHours}:${minutes.toString().padStart(2, '0')}`;
      periodElement.textContent = ampm;
      
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateElement.textContent = now.toLocaleDateString('en-US', options).replace(',', ' |');
    }
  }

  // Update time every minute
  updateDateTime();
  setInterval(updateDateTime, 60000);

  // Load pages content from separate HTML files or inline templates
  const pages = {
    home: null,
    apps: null,
    grid: '<section class="page"><h1>Grid View</h1><p>Grid view UI will be implemented here.</p></section>',
    music: null,
    settings: null,
    maps: null,
  };

  // Load pages from external HTML files
  async function loadPageContent(page) {
    if (page === 'home' || page === 'maps' || page === 'apps' || page === 'music' || page === 'settings') {
      try {
        const response = await fetch(`pages/${page === 'music' ? 'media' : page}.html`);
        const text = await response.text();
        return text;
      } catch (error) {
        console.error(`Failed to load page ${page}:`, error);
        return `<section class="page"><h1>Error</h1><p>Failed to load ${page} page.</p></section>`;
      }
    }
    return pages[page] || '<section class="page"><h1>Page Not Found</h1></section>';
  }

  async function setActivePage(page) {
    const content = await loadPageContent(page);
    appContainer.innerHTML = content;
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === page);
    });

    // Initialize page-specific functionality
    if (page === 'maps') {
      setTimeout(initializeMap, 100); // Small delay to ensure DOM is ready
    } else if (page === 'home') {
      initializeHomeWidgets();
    } else if (page === 'music') {
      initializeMediaControls();
    } else if (page === 'settings') {
      initializeSettingsControls();
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setActivePage(btn.dataset.page);
    });
  });

  // Initialize with home page
  setActivePage('home');

  // Check backend API status
  fetch('/api/status')
    .then(response => response.json())
    .then(data => {
      console.log('Backend status:', data.status);
    })
    .catch(err => {
      console.error('Failed to connect to backend API:', err);
    });

  // Initialize Leaflet map for Maps page
  function initializeMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || typeof L === 'undefined') return;

    // Clear previous map instance if any
    if (window.leafletMap) {
      window.leafletMap.remove();
    }

    try {
      window.leafletMap = L.map('map', {
        center: [37.7749, -122.4194], // Default to San Francisco
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(window.leafletMap);

      // Add a simple marker for current position
      L.marker([37.7749, -122.4194]).addTo(window.leafletMap);

      // Add route line
      const routeCoords = [
        [37.7749, -122.4194],
        [37.7849, -122.4094],
        [37.7949, -122.3994]
      ];
      L.polyline(routeCoords, { color: '#924dac', weight: 4 }).addTo(window.leafletMap);

    } catch (error) {
      console.error('Failed to initialize map:', error);
    }
  }

  // Initialize home page widgets
  function initializeHomeWidgets() {
    // Load weather data
    fetch('/api/weather')
      .then(response => response.json())
      .then(data => {
        const tempElement = document.querySelector('.temperature');
        const locationElement = document.querySelector('.location-text');
        if (tempElement) tempElement.textContent = `${data.temperature}°C`;
        if (locationElement) locationElement.textContent = data.location;
      })
      .catch(err => console.error('Failed to load weather data:', err));

    // Load vehicle status
    fetch('/api/vehicle/status')
      .then(response => response.json())
      .then(data => {
        const rangeElement = document.querySelector('.range');
        const chargeElement = document.querySelector('.charge-status');
        if (rangeElement) rangeElement.textContent = `${data.range}km Left`;
        if (chargeElement) chargeElement.textContent = `${data.batteryLevel}% ${data.charging ? 'Charging' : 'Not Charging'}`;
      })
      .catch(err => console.error('Failed to load vehicle status:', err));

    // Load music data
    fetch('/api/music/current')
      .then(response => response.json())
      .then(data => {
        const titleElement = document.querySelector('.music-info .title');
        const artistElement = document.querySelector('.music-info .artist');
        if (titleElement) titleElement.textContent = data.title;
        if (artistElement) artistElement.textContent = data.artist;
      })
      .catch(err => console.error('Failed to load music data:', err));
  }

  // Initialize media controls
  function initializeMediaControls() {
    const controlButtons = document.querySelectorAll('.media-controls .control-btn');
    controlButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.classList.contains('play') ? 'play' : 
                      btn.classList.contains('previous') ? 'previous' :
                      btn.classList.contains('next') ? 'next' :
                      btn.classList.contains('shuffle') ? 'shuffle' : 'repeat';
        
        fetch('/api/music/control', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Music control:', data);
          // Update UI based on response
          if (data.isPlaying) {
            btn.classList.add('active');
          }
        })
        .catch(err => console.error('Music control failed:', err));
      });
    });
  }

  // Initialize settings controls
  function initializeSettingsControls() {
    const slider = document.querySelector('.slider');
    const toggles = document.querySelectorAll('.toggle-input');
    const dropdowns = document.querySelectorAll('.setting-dropdown');

    if (slider) {
      slider.addEventListener('input', (e) => {
        console.log('Brightness changed:', e.target.value);
      });
    }

    toggles.forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        console.log('Toggle changed:', e.target.checked);
      });
    });

    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('change', (e) => {
        console.log('Setting changed:', e.target.value);
      });
    });
  }
});
