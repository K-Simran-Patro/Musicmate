// Global variables
let users = [];
let sender_id = 0;
let sender_name = "";
let currentTrackIndex = 0; // To track the current song
let currentTracks = []; // Array to store loaded tracks
const audioPlayer = document.createElement('audio');

// Function to load profiles and songs on page load
window.onload = function() {
    loadProfiles(); // Load user profiles
    loadSongs(); // Load songs
    fetchUserProfile();
};

// Function to load user profiles
async function loadProfiles() {
    try {
        const response = await fetch('http://localhost/Project/api/fetchUsers.php');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            users = data; // Assign fetched users to the global variable
            loadProfileCards(users);
        } else {
            console.error('No users found in the database.');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Function to load songs
async function loadSongs() {
    try {
        const response = await fetch('http://localhost/Project/fetch_songs.php');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            currentTracks = data; // Save the loaded songs in currentTracks
            displayAllSongs(data);
        } else {
            console.error('No songs found or invalid data format.');
        }
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

// Function to load and display user profiles
function loadProfileCards(users) {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = ''; // Clear the container

    users.forEach(user => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile-card'); // Add a class for styling

        const profileImg = document.createElement('img');
        profileImg.src = user.profile_picture || 'uploads/default.jpg'; // Default picture if none
        profileImg.alt = `${user.username}'s profile picture`;
        profileImg.classList.add('profile-pic'); // Add class for styling

        const profileName = document.createElement('p');
        profileName.textContent = user.username;

        profileDiv.appendChild(profileImg);
        profileDiv.appendChild(profileName);

        profileDiv.addEventListener('click', () => openChat(user.id,user.username)); // Click to open chat

        profileContainer.appendChild(profileDiv);
    });
}

// Function to display all songs
function displayAllSongs(songs) {
    const songsContainer = document.querySelector('.songs-container');
    songsContainer.innerHTML = ''; // Clear previous content

    songs.forEach((song, index) => {
        const songCard = document.createElement('div');
        songCard.classList.add('song-card');

        songCard.innerHTML = `
            <img src="${song.thumbnail || 'thumbnails/default-song-thumbnail.jpg'}" alt="${song.title}" class="song-thumbnail">
            <h2>${song.title}</h2>
            <button class="play-button" data-index="${index}">Play</button>
        `;

        songCard.querySelector('.play-button').addEventListener('click', () => {
            loadTrack(index); // Load the selected track
        });

        songsContainer.appendChild(songCard);
    });
}

// Play/Pause Button
document.getElementById('play-pause').addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('play-pause').innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        audioPlayer.pause();
        document.getElementById('play-pause').innerHTML = '<i class="fa fa-play"></i>';
    }
});

// Next Button
document.getElementById('next').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % currentTracks.length;
    loadTrack(currentTrackIndex);
});

// Previous Button
document.getElementById('prev').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + currentTracks.length) % currentTracks.length;
    loadTrack(currentTrackIndex);
});

// Load track into player
function loadTrack(index) {
    const track = currentTracks[index];
    audioPlayer.src = track.audio_file;
    document.getElementById('thumbnail').src = track.thumbnail || 'default-thumbnail.jpg';
    document.getElementById('title').textContent = track.title;
    document.getElementById('artist').textContent = track.artist;
    audioPlayer.play();
    document.getElementById('play-pause').innerHTML = '<i class="fa fa-pause"></i>';
}

// Update progress bar and time
audioPlayer.addEventListener('timeupdate', () => {
    const progress = document.getElementById('progress');
    progress.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.getElementById('current-time').textContent = formatTime(audioPlayer.currentTime);
});

document.getElementById('progress').addEventListener('input', (e) => {
    audioPlayer.currentTime = (e.target.value / 100) * audioPlayer.duration;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

// Function to handle opening chat
function openChat(userId, username) {
    // Redirect with both receiverId and username in the URL
    window.location.href = `chat.html?receiverId=${userId}&username=${encodeURIComponent(username)}&senderId=${sender_id}&senderName=${encodeURIComponent(sender_name)}`;
}

function fetchUserProfile() {
    fetch('http://localhost/Project/api/fetchUserProfile.php')
        .then(response => response.json())
        .then(user => {
            if (user) {
                sender_id = user.id;
                sender_name = user.username;
            } else {
                console.error('Failed to fetch user profile');
            }
        })
        .catch(error => console.error('Error fetching profile:', error));
}
