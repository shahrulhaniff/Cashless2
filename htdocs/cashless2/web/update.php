<?php
    require 'database.php';
 
    $id = null;
    if ( !empty($_GET['id'])) {
        $id = $_REQUEST['id'];
    }
     
    if ( null==$id ) {
        header("Location: index.php");
    }
     
    if ( !empty($_POST)) {
        // keep track validation errors
        $no_sbError = null;
        $descriptionError = null;
        $tarikhbukaError = null;
         
        // keep track post values
        $no_sb = $_POST['no_sb'];
        $description = $_POST['description'];
        $tarikhbuka = $_POST['tarikhbuka'];
         
        // validate input
        $valid = true;
        if (empty($no_sb)) {
            $no_sbError = 'Please enter no_sb';
            $valid = false;
        }
         
        if (empty($description)) {
            $descriptionError = 'Please enter description Address';
            $valid = false;
        } else if ( !filter_var($description,FILTER_VALIDATE_description) ) {
            $descriptionError = 'Please enter a valid description Address';
            $valid = false;
        }
         
        if (empty($tarikhbuka)) {
            $tarikhbukaError = 'Please enter tarikhbuka Number';
            $valid = false;
        }
         
        // update data
        if ($valid) {
            $pdo = Database::connect();
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "UPDATE kod_transaksi  set no_sb = ?, description = ?, tarikhbuka =? WHERE id = ?";
            $q = $pdo->prepare($sql);
            $q->execute(array($no_sb,$description,$tarikhbuka,$id));
            Database::disconnect();
            header("Location: index.php");
        }
    } else {
        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "SELECT * FROM kod_transaksi where id_kodtransaksi = ?";
        $q = $pdo->prepare($sql);
        $q->execute(array($id));
        $data = $q->fetch(PDO::FETCH_ASSOC);
        $no_sb = $data['no_sb'];
        $description = $data['description'];
        $tarikhbuka = $data['tarikhbuka'];
        Database::disconnect();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link   href="css/bootstrap.min.css" rel="stylesheet">
    <script src="js/bootstrap.min.js"></script>
</head>
 
<body>
    <div class="container">
     
                <div class="span10 offset1">
                    <div class="row">
                        <h3>Update Record</h3>
                    </div>
                    <form class="form-horizontal" action="update.php?id=<?php echo $id?>" method="post">
                      <div class="control-group <?php echo !empty($no_sbError)?'error':'';?>">
                        <label class="control-label">no_sb</label>
                        <div class="controls">
                            <input no_sb="no_sb" type="text"  placeholder="no_sb" value="<?php echo !empty($no_sb)?$no_sb:'';?>">
                            <?php if (!empty($no_sbError)): ?>
                                <span class="help-inline"><?php echo $no_sbError;?></span>
                            <?php endif; ?>
                        </div>
                      </div>
                      <div class="control-group <?php echo !empty($descriptionError)?'error':'';?>">
                        <label class="control-label">description Address</label>
                        <div class="controls">
                            <input no_sb="description" type="text" placeholder="description Address" value="<?php echo !empty($description)?$description:'';?>">
                            <?php if (!empty($descriptionError)): ?>
                                <span class="help-inline"><?php echo $descriptionError;?></span>
                            <?php endif;?>
                        </div>
                      </div>
                      <div class="control-group <?php echo !empty($tarikhbukaError)?'error':'';?>">
                        <label class="control-label">tarikhbuka Number</label>
                        <div class="controls">
                            <input no_sb="tarikhbuka" type="text"  placeholder="tarikhbuka Number" value="<?php echo !empty($tarikhbuka)?$tarikhbuka:'';?>">
                            <?php if (!empty($tarikhbukaError)): ?>
                                <span class="help-inline"><?php echo $tarikhbukaError;?></span>
                            <?php endif;?>
                        </div>
                      </div>
                      <div class="form-actions">
                          <button type="submit" class="btn btn-success">Update</button>
                          <a class="btn" href="index.php">Back</a>
                        </div>
                    </form>
                </div>
                 
    </div> <!-- /container -->
  </body>
</html>
 