<?php
session_start();

unset($_SESSION['IDOPERATOR']); 
unset($_SESSION['USERNAME']); 
unset($_SESSION['NMOPERATOR']);
unset($_SESSION['AKSES']);
unset($_SESSION['IDINSTANSI']);

session_destroy(); 
echo"
<script>
window.location='../home.html';
</script>";
exit; 
?>