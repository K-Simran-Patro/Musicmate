<?php
session_start();
require '../db_connection.php';

$user_id = $_SESSION['user_id']; // Database connection

$action = $_GET['action'] ?? '';

if ($action === 'load_chat_list') {
    log("load_chat_list");
    // Fetch users with whom the current user has chatted
    $stmt = $pdo->prepare("
        SELECT DISTINCT u.id, u.username
        FROM users u
        JOIN message m ON u.id = m.sender_id OR u.id = m.receiver_id
        WHERE m.sender_id = :user_id OR m.receiver_id = :user_id
    ");
    $stmt->execute(['user_id' => $user_id]); // Replace with the logged-in user's ID
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($action === 'load_chat') {
    $userId = $user_id; // Logged-in user's ID
    $otherUserId = $_GET['user_id'];

    log("load chat");
    log($otherUserId);

    $stmt = $pdo->prepare("
        SELECT sender_id, message, created_at
        FROM message
        WHERE (sender_id = :user_id AND receiver_id = :other_user)
           OR (sender_id = :other_user AND receiver_id = :user_id)
        ORDER BY created_at
    ");
    $stmt->execute(['user_id' => $userId, 'other_user' => $otherUserId]);

    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($messages as &$msg) {
        $msg['sender'] = $msg['sender_id'] == $userId ? 'me' : 'other';
    }
    echo json_encode($messages);
}

if ($action === 'send_message') {
    $userId = $user_id; // Logged-in user's ID
    $data = json_decode(file_get_contents('php://input'), true);
    $message = $data['message'];
    $receiverId = $_GET['user_id'];

    $stmt = $pdo->prepare("
        INSERT INTO message (sender_id, receiver_id, message, created_at)
        VALUES (:sender, :receiver, :message, NOW())
    ");
    $stmt->execute([
        'sender' => $userId,
        'receiver' => $receiverId,
        'message' => $message,
    ]);
}
