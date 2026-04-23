document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile();

    document.getElementById('save-profile-btn').addEventListener('click', saveProfile);
    document.getElementById('logout-button').addEventListener('click', () => {
        window.location.href = 'home.html';
    });
});

function uploadProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('profile_picture', file);

        fetch('http://localhost/Project/api/uploadProfilePicture.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the image source with the correct path
                document.getElementById('profile-picture').src = data.file_path;
                console.log('Profile picture uploaded successfully');
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error uploading picture:', error));
    }
}

// Fetch user profile data
function fetchUserProfile() {
    fetch('http://localhost/Project/api/fetchUserProfile.php')
        .then(response => response.json())
        .then(user => {
            if (user) {
                document.getElementById('profile-picture').src = user.profile_picture || 'uploads/default.jpg';
                document.getElementById('user-id').querySelector('span').textContent = user.id;
                document.getElementById('user-email').querySelector('span').textContent = user.email;
                document.getElementById('username').value = user.username || '';
                document.getElementById('dob').value = user.dob || ''; // This should reflect the date of birth
                document.getElementById('phone').value = user.phone || '';
            } else {
                console.error('Failed to fetch user profile');
            }
        })
        .catch(error => console.error('Error fetching profile:', error));
}



// Handle profile picture upload
function triggerProfilePictureUpload() {
    document.getElementById('profile-picture-upload').click();
}

function uploadProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('profile_picture', file);

        fetch('http://localhost/Project/api/uploadProfilePicture.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('profile-picture').src = data.file_path;
                console.log('Profile picture uploaded successfully');
            } else {
                console.error('Error:', data.message);
            }
        })
        .catch(error => console.error('Error uploading picture:', error));
    }
}

// Save profile changes
function saveProfile() {
    const username = document.getElementById('username').value;
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('dob', dob);
    formData.append('phone', phone);

    fetch('http://localhost/Project/api/updateUserProfile.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Profile updated successfully!');
        } else {
            alert('Failed to update profile.');
        }
    })
    .catch(error => {
        alert('An error occurred while updating profile.');
        console.error('Error:', error);
    });
}
