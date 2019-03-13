<?php
include "server.php";


   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   
         // Sanitise URL supplied values
         $no_sb 		  		= filter_var($obj->no_sb, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $description	  		= filter_var($obj->description, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $tarikhbuka	  		= filter_var($obj->tarikhbuka, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $tarikhtutup	  		= filter_var($obj->tarikhtutup, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $jam	  		  		= filter_var($obj->jam, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $harga	  		  		= filter_var($obj->harga, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $id_jenistransaksi	  	= filter_var($obj->id_jenistransaksi, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $kelas	  	  	  		= filter_var($obj->kelas, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $keyin_by	  	  	  	= filter_var($obj->uid, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $kod_pengguna	  	  	= filter_var($obj->kod_pengguna, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		 //$kod_pengguna = '3';
		 
		 //set date to insert
		 date_default_timezone_set("Asia/Singapore");
		 $tarikh_keyin =date('Y-m-d h:i:s');

         // Attempt to run PDO prepared statement
         try {
            $sql 	= "INSERT INTO kod_transaksi(kod_pengguna, no_sb, description, tarikhbuka, tarikhtutup, jam, harga, id_jenistransaksi, kelas, keyin_by, tarikh_keyin) 
			VALUES(:kod_pengguna, :no_sb, :description, :tarikhbuka, :tarikhtutup, :jam, :harga, :id_jenistransaksi, :kelas, :keyin_by, :tarikh_keyin)";
            $stmt 	= $pdo->prepare($sql);
			
            $stmt->bindParam(':kod_pengguna', $kod_pengguna, PDO::PARAM_STR);
			
            $stmt->bindParam(':no_sb', $no_sb, PDO::PARAM_STR);
            $stmt->bindParam(':description', $description, PDO::PARAM_STR);
            $stmt->bindParam(':tarikhbuka', $tarikhbuka, PDO::PARAM_STR);
            $stmt->bindParam(':tarikhtutup', $tarikhtutup, PDO::PARAM_STR);
            $stmt->bindParam(':jam', $jam, PDO::PARAM_STR);
            $stmt->bindParam(':harga', $harga, PDO::PARAM_STR);
            $stmt->bindParam(':id_jenistransaksi', $id_jenistransaksi, PDO::PARAM_STR);
            $stmt->bindParam(':kelas', $kelas, PDO::PARAM_STR);
            $stmt->bindParam(':keyin_by', $keyin_by, PDO::PARAM_STR);
            $stmt->bindParam(':tarikh_keyin', $tarikh_keyin, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode(array('message' => 'Rekod ' . $no_sb . ' berjaya ditambah'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

?>