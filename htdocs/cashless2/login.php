<?php
 include "server.php";

   
   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   // Sanitise URL supplied values
   $usr   = filter_var($obj->usr, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   $pwd	  = filter_var($obj->pwd, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
//$usr = '123';
//$pwd = '123';

   // Attempt to query database table and retrieve data
   try {
	    $auth ='Denied'; 
		$stmt = $pdo->query('SELECT usr, pwd FROM user_account');
        while($data = $stmt->fetch(PDO::FETCH_ASSOC)){
			
			$usrdb = $data['usr'];
			$pwddb = $data['pwd'];
			
			//classical way, now we got to change to while loop
			//if ($usr==$usrdb){
			//	/* echo */ $auth ='Granted';
			//}
			//else {
			//	/* echo */ $auth ='Denied'; 
			//}
			
			if (($usr==$usrdb)&&($pwd==$pwddb)){
				$auth ='Granted';
			}
			
				
		}
	  
      // Return data as JSON
      echo json_encode($auth);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }


?>