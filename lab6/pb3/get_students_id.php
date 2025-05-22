<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "school";

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id FROM students";
$result = $conn->query($sql);

$ids= [];
while ($row = $result->fetch_assoc()) {
    $ids[] = $row['id'];
}

// returnam json
$response = [
    "ids" => $ids,
];

echo json_encode($response);
$conn->close();
?>