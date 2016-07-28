<?php
     $temp = explode(".", $_FILES["file"]["name"]);
     //rename file
     $newfilename = str_replace('-', '', date("Y-m-d-h-i-s")).'.'.end($temp);

     move_uploaded_file($_FILES["file"]["tmp_name"], $newfilename);
     print_r($newfilename);
?>