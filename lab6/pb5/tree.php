<?php
$user = 'root';
$pass = '';
$host = 'localhost';
$db = 'treeView';

// luam directorul parinte de la request
$data = $_REQUEST['data'];

$db = new mysqli($host, $user, $pass, $db) or die("Could not connect to database");

// Fix the SQL query to handle NULL values properly
if (empty($data) || $data === 'null') {
    $sql = "SELECT id, fiu, nod FROM tree WHERE parinte IS NULL";
} else {
    $sql = "SELECT id, fiu, nod FROM tree WHERE parinte='" . mysqli_real_escape_string($db, $data) . "'";
}

$result = mysqli_query($db, $sql);

if (!$result) {
    die("Query failed: " . mysqli_error($db));
}

echo '<ul>';
while ($row = mysqli_fetch_array($result)) {
    if ($row['nod'] == true) {
        echo '<li><span class="directory caret" id="dir-' .$row['id'] . '" onclick="doSome(' . $row['id'] . ')">' . htmlspecialchars($row['fiu']) . '</span></li>';
    } else {
        echo '<li><span class="file" onclick="loadFile(' . $row['id'] . ', \'' . htmlspecialchars($row['fiu']) . '\')">' . htmlspecialchars($row['fiu']) . '</span></li>';
    }
}
echo '</ul>';

$db->close();
?>