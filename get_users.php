<?php
include('../db_connection.php');


try {
    $stmt = $pdo->query("SELECT id, username, profile_picture FROM users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to retrieve users: ' . $e->getMessage()]);
}
?>
