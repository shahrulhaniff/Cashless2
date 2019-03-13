<?php
include "server.php";


   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);



      // Add a new record to the technologies table
     

         // Sanitise URL supplied values
         $usr 		     = filter_var($obj->usr, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $pwd	  = filter_var($obj->pwd, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "INSERT INTO account(usr, pwd) VALUES(:usr, :pwd)";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':usr', $usr, PDO::PARAM_STR);
            $stmt->bindParam(':pwd', $pwd, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode(array('message' => 'Congratulations the record ' . $usr . ' was added to the database'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

?>