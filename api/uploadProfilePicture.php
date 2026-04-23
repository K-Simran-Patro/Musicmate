<?php
session_start();
require '../db_connection.php';

$user_id = $_SESSION['user_id']; // Ensure session contains user_id

if (isset($_FILES['profile_picture'])) {
    $target_dir = "../uploads/";
    $file_name = uniqid() . "_" . basename($_FILES['profile_picture']['name']); // Generate unique file name
    $target_file = $target_dir . $file_name;

    // Move the uploaded file
    if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $target_file)) {
        $file_path = 'uploads/' . $file_name;

        // Update the database with the new profile picture path
        $stmt = $pdo->prepare("UPDATE users SET profile_picture = ? WHERE id = ?");
        $stmt->execute([$file_path, $user_id]);

        echo json_encode(['success' => true, 'file_path' => $file_path]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload file.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No file uploaded.']);
}
?>
