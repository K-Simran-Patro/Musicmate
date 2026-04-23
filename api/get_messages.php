<?php
include 'db_connection.php';

$receiver_id = $_GET['receiver_id'];
$sender_id = $_SESSION['user_id']; // Assuming the user is logged in

$query = "SELECT * FROM messages 
          WHERE (sender_id = $sender_id AND receiver_id = $receiver_id) 
             OR (sender_id = $receiver_id AND receiver_id = $sender_id) 
          ORDER BY created_at";
$result = $pdo->query($query);
$messages = [];

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $messages[] = $row;
}

echo json_encode($messages);
?>
