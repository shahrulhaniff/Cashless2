<?php
 include "server.php";


   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   $key     =  strip_tags($obj->key);

   // Determine which mode is being requested
   switch($key)
   {

      // Add a new record to the technologies table
      case "create":

         //Sanitise URL supplied values
         $title   = filter_var($obj->title, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $desc	  = filter_var($obj->desc, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $genre	  = filter_var($obj->genre, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $user	  = filter_var($obj->user, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

         // Attempt to run PDO prepared statement
         try {
			 
$sql2 = 'SELECT max(mysort) as mymax FROM mylist WHERE userid="'.$user.'"'; 
$statement = $pdo->prepare($sql2);
$statement->execute(); // no need to add `$sql` here, you can take that out
$item_id = $statement->fetchColumn();
$susun = $item_id+1;
			 
			 
			 
            $sql 	= "INSERT INTO mylist(mysort, title, description, genre, userid) VALUES(:susun, :title, :desc, :genre, :user )";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':susun', $susun,  PDO::PARAM_STR);
            $stmt->bindParam(':title', $title, PDO::PARAM_STR);
            $stmt->bindParam(':desc' , $desc,  PDO::PARAM_STR);
            $stmt->bindParam(':genre', $genre,  PDO::PARAM_STR);
            $stmt->bindParam(':user', $user,  PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode(array('message' => 'Congratulations the record ' . $title . ' was added to the database'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Update an existing record in the technologies table
      case "update":

         // Sanitise URL supplied values
         $user	  = filter_var($obj->user, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $title	  = filter_var($obj->title, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $desc	  = filter_var($obj->desc, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $genre	  = filter_var($obj->genre, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $recordID	     = filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "UPDATE mylist SET title = :title, description = :desc, genre = :genre WHERE id = :recordID AND userid = :user";
            $stmt 	=	$pdo->prepare($sql);
            $stmt->bindParam(':user', $user, PDO::PARAM_STR);
            $stmt->bindParam(':title', $title, PDO::PARAM_STR);
            $stmt->bindParam(':desc', $desc, PDO::PARAM_STR);
            $stmt->bindParam(':genre', $genre, PDO::PARAM_STR);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $title . ' was updated');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Remove an existing record in the technologies table
      case "delete":

         // Sanitise supplied record ID for matching to table record
         $recordID	=	filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);
         $user	=	filter_var($obj->user, FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $pdo 	= new PDO($dsn, $un, $pwd);
            $sql 	= "DELETE FROM mylist WHERE id = :recordID AND userid = :user";
            $stmt 	= $pdo->prepare($sql);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
            $stmt->bindParam(':user', $user, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $recordID . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
   }

?>