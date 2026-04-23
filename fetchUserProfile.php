<?php
session_start();
require '../db_connection.php';

$user_id = $_SESSION['user_id'];

$stmt = $pdo->prepare("SELECT id, email, username, phone, dob, profile_picture FROM users WHERE id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode($user);
} else {
    echo json_encode(['error' => 'User not found']);
}
?>
