<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "school";

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// parametrii primiti de la client
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = 3;

// extragem intregistrari
$sql = "SELECT * FROM students LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

// calculam cate in total sunt pt paginare
$countSql = "SELECT COUNT(*) as total FROM students";
$countResult = $conn->query($countSql);
$totalRows = $countResult->fetch_assoc()['total'];

// returnam json
$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

$response = [
    "students" => $students,
    "total" => intval($totalRows),
];

echo json_encode($response);

$conn->close();

?>