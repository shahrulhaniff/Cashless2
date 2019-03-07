<?php
include "server.php";


   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);



      // Add a new record to the technologies table
     

         // Sanitise URL supplied values
         $id 		     = filter_var($obj->id, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $evname	  = filter_var($obj->evname, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		 
		 //set date to insert
		 date_default_timezone_set("Asia/Singapore");
		 $tHadir =date('Y-m-d h:i:s');

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "INSERT INTO event_registration(idEvent, idParticipant, tHadir) VALUES(:evname, :id, :tHadir)";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_STR);
            $stmt->bindParam(':evname', $evname, PDO::PARAM_STR);
            $stmt->bindParam(':tHadir', $tHadir, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode(array('message' => 'Congratulations the record ' . $id . ' was added to the database'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

?>