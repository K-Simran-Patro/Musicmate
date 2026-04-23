<?php
// start_conversation.php
include('../db_connection.php'); // Adjusted path

$data = json_decode(file_get_contents("php://input"));

$sender_id = $data->sender_id;
$receiver_id = $data->receiver_id;
$message = $data->message;

// Debugging output
error_log("Starting conversation with Sender ID: $sender_id, Receiver ID: $receiver_id");

$stmt = $pdo->prepare("INSERT INTO messages (sender_id, receiver_id, message, created_at) VALUES (?, ?, ?, NOW())");
$stmt->execute([$sender_id, $receiver_id, $message]);

echo json_encode(['success' => true]);
?>
