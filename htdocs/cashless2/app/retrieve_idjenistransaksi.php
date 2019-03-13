<?php
  include "server.php";
 
  $data    = array();

   try {
	  
      $stmt 	= $pdo->query('
	  SELECT * FROM kod_jenistransaksi ORDER BY jenistransaksi ASC');
	  
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