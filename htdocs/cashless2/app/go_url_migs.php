<?php

   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   
         // Sanitise URL supplied values
         $url_go 		  		= filter_var($obj->url_go, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		 
		

?>