<?php
session_start();
require '../db_connection.php';

$user_id = $_SESSION['user_id'];

if (isset($_POST['username'], $_POST['dob'], $_POST['phone'])) {
    $username = $_POST['username'];
    $dob = $_POST['dob']; // Ensure this is in the correct format
    $phone = $_POST['phone'];

    $stmt = $pdo->prepare("UPDATE users SET username = ?, dob = ?, phone = ? WHERE id = ?");
    $success = $stmt->execute([$username, $dob, $phone, $user_id]);

    echo json_encode(['success' => $success]);
} else {
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
}
?>
