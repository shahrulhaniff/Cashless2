<html>
<head>
<style>
body {
  background-color: lightgreen;
}

@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
</style>
</head><body> <h1>
<?php
include "server.php";
 
  $cn = $_GET['cn'];
  $ced = $_GET['ced'];
  $csc = $_GET['csc'];
  $pa = $_GET['pa'];
  
  echo "Card number :",$cn , "<br>Card exp date :",$ced , "<br>Card Security Code :",$csc , "<br>Payment Amount :",$pa;
  
?>
<br>
<a href="done.php">Done</a>


<button onclick="closeWin()">close</button>
</h1>
<script>

function closeWin() {
  browser.close();
}
</script>
</body>
</html>