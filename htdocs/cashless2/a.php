<?php
include "server.php";


//$info    = array();
  
//$stmt2 = $pdo->query('SELECT max(mysort) as mymax FROM mylist WHERE userid="123"');
//$row2  = $stmt2->fetch(PDO::FETCH_OBJ);
//$info[] = $row2;

//echo $info['mymax'];
//echo json_encode($info);
$id="123";

$sql = 'SELECT max(mysort) as mymax FROM mylist WHERE userid="'.$id.'"'; 

$statement = $pdo->prepare($sql);
$statement->execute(); // no need to add `$sql` here, you can take that out
$item_id = $statement->fetchColumn();
echo $item_id+1;

?>