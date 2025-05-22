<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "school";

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// id-ul primit de la client
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// extragem studentul cu id-ul respectiv
$sql = "SELECT * FROM students WHERE id = $id";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $student = $result->fetch_assoc();
} else {
    $student = null;
}

// returnam json
$response = [
    "student" => $student,
];

echo json_encode($response);
$conn->close();

?>

