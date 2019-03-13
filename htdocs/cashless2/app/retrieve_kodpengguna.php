<?php
  include "server.php";
 
  $id = $_GET['id'];
  $data    = array();

   try {
	  
      $stmt 	= $pdo->query('
	  SELECT * FROM akaun_pengguna AP, kod_jenispengguna KP 
	  WHERE AP.ic_pengguna="'.$id.'" 
	  AND KP.kod_pengguna = AP.kod_pengguna ');
	  
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $data[] = $row;
      }

      // Return data as JSON
      echo json_encode($data);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }

?>