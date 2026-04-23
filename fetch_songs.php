<?php
// Database connection
$conn = new mysqli('localhost', 'root', '', 'musicmate');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch songs from the database
$sql = "SELECT * FROM songs";
$result = $conn->query($sql);

$songs = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $songs[] = array(
            'title' => $row['title'],
            'artist' => $row['artist'],
            'thumbnail' => 'thumbnails/' . $row['thumbnail'],  // Update with correct path
            'audio_file' => 'songs/' . $row['audio_file']      // Update with correct path
        );
    }
}

// Return songs as JSON
echo json_encode($songs);

$conn->close();
?>