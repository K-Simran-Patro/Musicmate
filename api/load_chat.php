<?php
// Include the database connection
require '../db_connection.php';

// Get sender and receiver IDs from the query parameters
$sender_id = $_GET['sender_id'];
$receiver_id = $_GET['receiver_id'];

if (isset($_GET['sender_id']) && isset($_GET['receiver_id'])) {
    $senderId = $_GET['sender_id'];
    $receiverId = $_GET['receiver_id'];

    // Now you can proceed with fetching messages
    $stmt = $pdo->prepare("SELECT * FROM message WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)");
    $stmt->execute([$senderId, $receiverId, $receiverId, $senderId]);

    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($messages);
} else {
    echo json_encode(['error' => 'Missing sender_id or receiver_id']);
}
?>
