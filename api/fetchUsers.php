<?php
// Database connection
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "musicmate"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Return error in JSON if connection fails
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// SQL query to fetch all users
$sql = "SELECT id, username, profile_picture FROM users";
$result = $conn->query($sql);

$users = array();

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Handle null profile pictures by setting a default image
        if (empty($row['profile_picture'])) {
            $row['profile_picture'] = 'thumbnails/default-profile.png'; // Path to default image
        }
        $users[] = $row;
    }
} else {
    $users = [];
}

$conn->close();

// Return users as JSON
header('Content-Type: application/json');
echo json_encode($users);
?>