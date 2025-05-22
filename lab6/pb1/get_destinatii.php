<?php
$oras_plecare = $_GET['oras'];

$conn = new mysqli("localhost", "root", "", "trenuri");

if ($conn->connect_error) {
    die("Conexiune esuata: " . $conn->connect_error);
}

$sql = $conn->prepare("SELECT oras_sosire FROM rute WHERE oras_plecare = ?");
$sql->bind_param("s", $oras_plecare);
$sql->execute();
$result = $sql->get_result();

while ($row = $result->fetch_assoc()) {
    echo "<option value='" . htmlspecialchars($row['oras_sosire']) . "'>" . htmlspecialchars($row['oras_sosire']) . "</option>";
}

$conn->close();
?>