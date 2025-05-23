<?php

$user = 'root';
$pass = '';
$host = 'localhost';
$dbName = 'treeView';

$fileId = $_REQUEST['id'];

$connection = new mysqli($host, $user, $pass, $dbName) or die("Could not connect to database");

function buildFilePath($database, $nodeId, $path = '') {
    $sql = "SELECT fiu, parinte FROM tree WHERE id = " . intval($nodeId);
    $result = mysqli_query($database, $sql);

    if ($row = mysqli_fetch_array($result)) {
        $name = $row['fiu'];
        $parentId = $row['parinte'];

        $path = $name . ($path ? '/' . $path : '');

        if ($parentId !== NULL) {
            return buildFilePath($database, $parentId, $path);
        } else {
            // This is the root folder (files), exclude it from the path
            return $path === 'files' ? '' : $path;
        }
    }

    return false;
}

$baseDirectory = '/Applications/XAMPP/xamppfiles/htdocs/';

$relativePath = buildFilePath($connection, $fileId);

if ($relativePath !== false) {
    if ($relativePath === '') {
        // This is the root files folder itself
        echo "This is a directory, not a file.";
    } else {
        $fullPath = $baseDirectory . $relativePath;

        if (file_exists($fullPath)) {
            $fileExtension = pathinfo($fullPath, PATHINFO_EXTENSION);

            $testExtensions = ['txt', 'html', 'css', 'js', 'php', 'md', 'json', 'xml', 'sh', 'sql', 'csv', 'log'];

            if (in_array(strtolower($fileExtension), $testExtensions)) {
                echo file_get_contents($fullPath);
            } else {
                echo "Binary file: " . basename($fullPath);
            }
        } else {
            echo "File not found: " . $fullPath;
        }
    }
} else {
    echo "Unable to determine file path for ID: " . $fileId;
}

$connection->close();
?>