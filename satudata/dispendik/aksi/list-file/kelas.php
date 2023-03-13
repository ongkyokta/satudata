<?php
error_reporting(0);
$idsekolah = trim($_POST['idsekolah']);
$ruang = trim($_POST['ruang']);

$dir = "../../../data-media/foto/".$idsekolah."/".$ruang."/";
$source_files = glob($dir."*.jpeg"); 
$data = array();
for($i=0;$i<count($source_files);$i++){
    $row_array = array();
	$row_array['nmfile']=basename($source_files[$i]);
    array_push($data,$row_array);
}
echo json_encode($data);
?>