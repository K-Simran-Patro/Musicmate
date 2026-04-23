<?php
// chat_api.php
session_start(); // Start the session to access user data
include('../db_connection.php'); // Adjusted path

$userId = $_GET['user_id'];
$currentUserId = $_SESSION['user_id']; // Assuming you store the logged-in user ID in the session

if ($userId && $currentUserId) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)");
        $stmt->execute([$currentUserId, $userId, $userId, $currentUserId]);
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($messages);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid user ID']);
}
?>
