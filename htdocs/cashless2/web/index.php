<!DOCTYPE html>
<html lang="en">
<head>
		<meta charset="utf-8">
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<script src="js/bootstrap.mid.js"></script>
</head>

		<script>
		$(document).ready(function() {
    var table = $('#example').DataTable();
    var tt = new $.fn.dataTable.TableTools( table );
 
    $( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');
} );
		
		</script>

<body>
	<div class="container">
		<div class="row">
			</br>
			</br>
		</div>
		<div class="row">
			<p>
			<a href ="create.php" button class="btn btn-success">Create</button></a>
				
			</p>
			<table class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>No Sebut Harga</th>
						<th>Keterangan</th>
						<th>Tarikh Buka</th>
						<th>Tindakan</th>
					</tr>
				</thead>
				<tbody>
					<?php
						include 'database.php';
						$pdo = Database::connect();
						$sql = 'SELECT * FROM kod_transaksi ORDER BY kod_pengguna DESC';
						foreach ($pdo->query($sql) as $row){
							echo '<tr>';
							echo '<td>'. $row['no_sb'] . '</td>';
							echo '<td>'. $row['description'] . '</td>';
							echo '<td>'. $row['tarikhbuka'] . '</td>';
						    echo '<td width=250>';
                            echo '<a class="btn" href="read.php?id='.$row['id_kodtransaksi'].'">Info</a>';
                                echo '  ';
                                echo '<a class="btn btn-success" href="update.php?id='.$row['id_kodtransaksi'].'">Update</a>';
                                echo '  ';
                                echo '<a class="btn btn-danger" href="delete.php?id='.$row['id_kodtransaksi'].'">Delete</a>';
                                echo '</td>';
						}
						Database::disconnect();
					?>
				</tbody>
			</table>
		</div>
</body>
</html>