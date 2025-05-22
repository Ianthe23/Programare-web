<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "school";

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// luam PUT data
$pudData = file_get_contents("php://input");
$data = json_decode($pudData, true);

// validam datele
if (!isset($data['id']) || empty($data['id'])) {
    echo json_encode(["error" => "ID is required"]);
    exit;
}

$id = intval($data['id']);
$nume = $conn->real_escape_string($data['nume']);
$prenume = $conn->real_escape_string($data['prenume']);
$telefon = $conn->real_escape_string($data['telefon']);
$email = $conn->real_escape_string($data['email']);

$stmt = $conn->prepare("UPDATE students SET nume = ?, prenume = ?, telefon = ?, email = ? WHERE id = ?");
$stmt->bind_param("ssssi", $nume, $prenume, $telefon, $email, $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => "Student updated successfully"]);
    } else {
        echo json_encode(["error" => "No changes made"]);
    }
} else {
    echo json_encode(["error" => "Error updating student: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>