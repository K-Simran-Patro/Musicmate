<?php
session_start(); // Start the session at the beginning

$servername = "localhost"; // Your server name
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "musicmate"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the submitted email and password
$email = $_POST['email'];
$password = $_POST['password'];

// Prepare the SQL statement to prevent SQL injection
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Check if the user exists
if ($result->num_rows > 0) {
    // Fetch the user's data
    $row = $result->fetch_assoc();

    // Verify the entered password with the hashed password in the database
    if (password_verify($password, $row['password'])) {
        // Password is correct, set session variables
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['email'] = $row['email'];

        // Redirect to the main page
        header("Location: main.html");
        exit();
    } else {
        // Password is incorrect
        echo "<script>alert('Incorrect password.'); window.location.href = 'login.html';</script>";
    }
} else {
    // User account does not exist
    echo "<script>alert('User account does not exist. Please sign up.'); window.location.href = 'signup.html';</script>";
}
?>