<?php
header('Content-Type: application/json');

function checkXWin($array) {
    return ($array[0] == 'X' && $array[1] == 'X' && $array[2] == 'X') ||
           ($array[3] == 'X' && $array[4] == 'X' && $array[5] == 'X') ||
           ($array[6] == 'X' && $array[7] == 'X' && $array[8] == 'X') ||
           ($array[0] == 'X' && $array[3] == 'X' && $array[6] == 'X') ||
           ($array[1] == 'X' && $array[4] == 'X' && $array[7] == 'X') ||
           ($array[2] == 'X' && $array[5] == 'X' && $array[8] == 'X') ||
           ($array[0] == 'X' && $array[4] == 'X' && $array[8] == 'X') ||
           ($array[2] == 'X' && $array[4] == 'X' && $array[6] == 'X');
}

function checkOWin($array) {
    return ($array[0] == 'O' && $array[1] == 'O' && $array[2] == 'O') ||
           ($array[3] == 'O' && $array[4] == 'O' && $array[5] == 'O') ||
           ($array[6] == 'O' && $array[7] == 'O' && $array[8] == 'O') ||
           ($array[0] == 'O' && $array[3] == 'O' && $array[6] == 'O') ||
           ($array[1] == 'O' && $array[4] == 'O' && $array[7] == 'O') ||
           ($array[2] == 'O' && $array[5] == 'O' && $array[8] == 'O') ||
           ($array[0] == 'O' && $array[4] == 'O' && $array[8] == 'O') ||
           ($array[2] == 'O' && $array[4] == 'O' && $array[6] == 'O');
}

$array = str_split($_GET['array']);
$isfinished = 1;

if (checkXWin ($array)) {
    $reponse = ['board' => implode('', $array), 'gameOver' => true, 'winner' => 'X', 'isDraw' => false];
    echo json_encode($reponse);
    exit;
}

if (checkOWin ($array)) {
    $reponse = ['board' => implode('', $array), 'gameOver' => true, 'winner' => 'O', 'isDraw' => false];
    echo json_encode($reponse);
    exit;
}

for ($i = 0; $i < 9; $i++) {
    if ($array[$i] == "-")
        $isfinished = 0;
}

// Make computer's move if game isn't finished
if ($isfinished == 0) {
    $index = rand(0, 8);
    while($array[$index] != "-") {
        $index = rand(0, 8);
    }
    $array[$index] = "O";
}

$xwin = 0;
$owin = 0;

// Check if player X won
if (checkXWin($array)) {
    $xwin = 1;
}

// Check if computer O won
if (checkOWin($array)) {
    $owin = 1;
}

if ($xwin == 1 || $owin == 1) {
    $isfinished = 1;
}

// Check for draw
$isDraw = true;
foreach ($array as $cell) {
    if ($cell == '-') {
        $isDraw = false;
        break;
    }
}

// Prepare response
$response = [
    'board' => implode('', $array),
    'gameOver' => $isfinished == 1 || $isDraw,
    'winner' => $xwin == 1 ? 'X' : ($owin == 1 ? 'O' : ''),
    'isDraw' => $isDraw && $xwin == 0 && $owin == 0
];

echo json_encode($response);
?>