// Music data for different moods
const musicData = {
    happy: [
        { title: "Sunshine Day", artist: "Happy Vibes", duration: "3:45" },
        { title: "Good Times", artist: "Joyful Beats", duration: "4:12" },
        { title: "Dancing Queen", artist: "Feel Good", duration: "3:28" },
        { title: "Happy Song", artist: "Upbeat Music", duration: "3:55" },
        { title: "Celebration", artist: "Party Time", duration: "4:03" }
    ],
    sad: [
        { title: "Tears in Rain", artist: "Melancholy Soul", duration: "4:32" },
        { title: "Blue Monday", artist: "Sad Strings", duration: "3:47" },
        { title: "Lonely Heart", artist: "Deep Emotions", duration: "4:15" },
        { title: "Goodbye", artist: "Sorrowful Sounds", duration: "3:58" },
        { title: "Empty Room", artist: "Quiet Moments", duration: "4:21" }
    ],
    chill: [
        { title: "Ocean Waves", artist: "Calm Sounds", duration: "5:12" },
        { title: "Sunset Breeze", artist: "Relaxing Vibes", duration: "4:38" },
        { title: "Peaceful Mind", artist: "Zen Music", duration: "6:05" },
        { title: "Lazy Sunday", artist: "Chill Beats", duration: "4:44" },
        { title: "Meditation", artist: "Tranquil Tunes", duration: "5:33" }
    ],
    energetic: [
        { title: "Power Up", artist: "High Energy", duration: "3:22" },
        { title: "Adrenaline Rush", artist: "Pump It Up", duration: "3:45" },
        { title: "Beast Mode", artist: "Workout Music", duration: "4:01" },
        { title: "Fire Storm", artist: "Intense Beats", duration: "3:37" },
        { title: "Thunder Strike", artist: "Electric Sound", duration: "3:54" }
    ],
    romantic: [
        { title: "Love Story", artist: "Romance Music", duration: "4:25" },
        { title: "Heart to Heart", artist: "Sweet Melodies", duration: "3:52" },
        { title: "Forever Yours", artist: "Love Songs", duration: "4:18" },
        { title: "Moonlight Dance", artist: "Romantic Vibes", duration: "4:07" },
        { title: "Perfect Match", artist: "Soulful Love", duration: "3:43" }
    ]
};

// Global variables
let currentMood = '';
let currentSongIndex = 0;
let isPlaying = false;
let currentTime = 0;
let totalTime = 225; // 3:45 in seconds
let isLoggedIn = false;
let currentUser = null;

// DOM elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const moodSelection = document.getElementById('moodSelection');
const musicPlayer = document.getElementById('musicPlayer');
const logo = document.getElementById('logo');
const moodCards = document.querySelectorAll('.mood-card');
const backBtn = document.getElementById('backBtn');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSong = document.getElementById('currentSong');
const currentArtist = document.getElementById('currentArtist');
const playlist = document.getElementById('playlist');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');

// Auth elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const userInfo = document.getElementById('userInfo');
const authButtons = document.getElementById('authButtons');
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

// Search elements
const searchInput = document.getElementById('searchInput');
const navItems = document.querySelectorAll('.nav-item');

// Initialize the app
function init() {
    // Add event listeners to mood cards
    moodCards.forEach(card => {
        card.addEventListener('click', () => {
            const mood = card.getAttribute('data-mood');
            selectMood(mood);
        });
    });

    // Add event listeners to player controls
    backBtn.addEventListener('click', goBackToMoods);
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', previousSong);
    nextBtn.addEventListener('click', nextSong);
    progressBar.addEventListener('click', seekSong);

    // Sidebar functionality
    sidebarToggle.addEventListener('click', toggleSidebar);

    // Auth functionality
    loginBtn.addEventListener('click', () => showModal(loginModal));
    signupBtn.addEventListener('click', () => showModal(signupModal));
    closeLoginModal.addEventListener('click', () => hideModal(loginModal));
    closeSignupModal.addEventListener('click', () => hideModal(signupModal));
    switchToSignup.addEventListener('click', () => {
        hideModal(loginModal);
        showModal(signupModal);
    });
    switchToLogin.addEventListener('click', () => {
        hideModal(signupModal);
        showModal(loginModal);
    });
    
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
    logoutBtn.addEventListener('click', handleLogout);

    // Search functionality
    searchInput.addEventListener('input', handleSearch);

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) hideModal(loginModal);
        if (e.target === signupModal) hideModal(signupModal);
    });

    // Check if user is logged in (simulate with localStorage)
    checkAuthStatus();
}

// Sidebar functionality
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

// Modal functionality
function showModal(modal) {
    modal.classList.add('active');
}

function hideModal(modal) {
    modal.classList.remove('active');
}

// Auth functionality
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = e.target.querySelector('input[type="email"]').value;
    const name = email.split('@')[0]; // Simple name extraction
    
    // Simulate login
    isLoggedIn = true;
    currentUser = { name, email };
    localStorage.setItem('user', JSON.stringify(currentUser));
    
    updateAuthUI();
    hideModal(loginModal);
    e.target.reset();
}

function handleSignup(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate signup
    isLoggedIn = true;
    currentUser = { name, email };
    localStorage.setItem('user', JSON.stringify(currentUser));
    
    updateAuthUI();
    hideModal(signupModal);
    e.target.reset();
}

function handleLogout() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem('user');
    updateAuthUI();
}

function checkAuthStatus() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateAuthUI();
    }
}

function updateAuthUI() {
    if (isLoggedIn && currentUser) {
        userInfo.style.display = 'flex';
        authButtons.style.display = 'none';
        userName.textContent = currentUser.name;
    } else {
        userInfo.style.display = 'none';
        authButtons.style.display = 'flex';
    }
}

// Search functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    // This is a basic search simulation
    // In a real app, you'd search through your music database
    console.log('Searching for:', query);
}

// Select mood and show music player
function selectMood(mood) {
    currentMood = mood;
    currentSongIndex = 0;
    
    // Change background based on mood
    document.body.className = `mood-${mood}`;
    
    // Change logo color
    logo.className = `logo logo-${mood}`;
    
    // Hide mood selection and show music player
    moodSelection.style.display = 'none';
    musicPlayer.style.display = 'block';
    
    // Load playlist for selected mood
    loadPlaylist();
    
    // Load first song
    loadSong(0);
}

// Go back to mood selection
function goBackToMoods() {
    moodSelection.style.display = 'flex';
    musicPlayer.style.display = 'none';
    
    // Reset background
    document.body.className = '';
    logo.className = 'logo';
    
    // Reset player state
    isPlaying = false;
    playBtn.textContent = '▶️';
    currentTime = 0;
    updateProgress();
}

// Load playlist based on current mood
function loadPlaylist() {
    const songs = musicData[currentMood];
    playlist.innerHTML = '';
    
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';
        songItem.innerHTML = `
            <div class="song-details">
                <h5>${song.title}</h5>
                <p>${song.artist}</p>
            </div>
            <span class="song-duration">${song.duration}</span>
        `;
        
        songItem.addEventListener('click', () => {
            loadSong(index);
        });
        
        playlist.appendChild(songItem);
    });
}

// Load a specific song
function loadSong(index) {
    const songs = musicData[currentMood];
    const song = songs[index];
    
    currentSongIndex = index;
    currentSong.textContent = song.title;
    currentArtist.textContent = song.artist;
    totalTimeEl.textContent = song.duration;
    
    // Convert duration to seconds for progress calculation
    const [minutes, seconds] = song.duration.split(':');
    totalTime = parseInt(minutes) * 60 + parseInt(seconds);
    
    // Update active song in playlist
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Reset progress
    currentTime = 0;
    updateProgress();
    
    // Reset play button if not playing
    if (!isPlaying) {
        playBtn.textContent = '▶️';
    }
}

// Toggle play/pause
function togglePlay() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playBtn.textContent = '⏸️';
        startProgress();
    } else {
        playBtn.textContent = '▶️';
        stopProgress();
    }
}

// Previous song
function previousSong() {
    const songs = musicData[currentMood];
    currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
    loadSong(currentSongIndex);
    
    if (isPlaying) {
        startProgress();
    }
}

// Next song
function nextSong() {
    const songs = musicData[currentMood];
    currentSongIndex = currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
    loadSong(currentSongIndex);
    
    if (isPlaying) {
        startProgress();
    }
}

// Seek song by clicking on progress bar
function seekSong(e) {
    const progressBarWidth = progressBar.offsetWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / progressBarWidth) * totalTime;
    
    currentTime = newTime;
    updateProgress();
}

// Progress simulation
let progressInterval;

function startProgress() {
    progressInterval = setInterval(() => {
        currentTime += 1;
        
        if (currentTime >= totalTime) {
            currentTime = 0;
            nextSong();
        }
        
        updateProgress();
    }, 1000);
}

function stopProgress() {
    clearInterval(progressInterval);
}

function updateProgress() {
    const progressPercent = (currentTime / totalTime) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Update current time display
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Format time helper function
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);