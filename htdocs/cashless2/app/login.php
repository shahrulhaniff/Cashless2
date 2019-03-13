<?php
 include "server.php";

   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   // Sanitise URL supplied values
   $usr   = filter_var($obj->usr, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   $pwd	  = filter_var($obj->pwd, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
//$usr = '941013115436';
//$pwd = '123';

   // Attempt to query database table and retrieve data
   try {
	    $auth ='Denied'; 
		$stmt = $pdo->query('SELECT ic_pengguna, pwd FROM akaun_pengguna');
        while($data = $stmt->fetch(PDO::FETCH_ASSOC)){
			
			$usrdb = $data['ic_pengguna'];
			$pwddb = $data['pwd']; 
			
		$stmt2 = $pdo->query('SELECT count(ic_pengguna) AS cek_jum_akaun FROM akaun_pengguna WHERE ic_pengguna ="'.$usr.'"');
			$data2 = $stmt2->fetch(PDO::FETCH_ASSOC);
			$cek_jum_akaun = $data2['cek_jum_akaun'];
			
			if (($usr==$usrdb)&&($pwd==$pwddb)){
				
				if($cek_jum_akaun>1){ $auth ='Granted2'; }
				
				else
				{$auth ='Granted'; }
				
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