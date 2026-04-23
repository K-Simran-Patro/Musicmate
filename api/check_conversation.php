<?php
// check_conversation.php
include('../db_connection.php'); // Adjusted path

$sender_id = $_GET['sender_id'];
$receiver_id = $_GET['receiver_id'];

// Debugging output
error_log("Sender ID: $sender_id, Receiver ID: $receiver_id");

$stmt = $pdo->prepare("SELECT COUNT(*) FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)");
$stmt->execute([$sender_id, $receiver_id, $receiver_id, $sender_id]);
$exists = $stmt->fetchColumn() > 0;

// Debugging output
error_log("Conversation Exists: " . ($exists ? 'Yes' : 'No'));

echo json_encode($exists);
?>
