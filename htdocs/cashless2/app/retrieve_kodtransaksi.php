<?php
  include "server.php";
 
  //try main get dulu sebab nak post vaue select where xjadi lagi
  $id = $_GET['id'];
  $data    = array();

      

   // Attempt to query database table and retrieve data
   try {
	  
      $stmt 	= $pdo->query('
	  SELECT * FROM kod_transaksi KT, akaun_pengguna AP 
	  
	  WHERE AP.ic_pengguna="'.$id.'" 
	  AND KT.kod_pengguna=AP.kod_pengguna
	  AND KT.tarikhtutup >= CURDATE()
	  
	  ORDER BY KT.tarikhtutup ASC');
	  
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