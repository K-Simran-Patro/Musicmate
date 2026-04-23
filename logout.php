<?php
session_start(); // Start session
session_unset(); // Clear session variables
session_destroy(); // Destroy session

header('Location: home.html'); // Redirect to home page
exit();
?>
