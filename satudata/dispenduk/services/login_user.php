<?php
error_reporting(0);
include 'config.php';
$dbconn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)or die('Could not connect: '); 
$mysqli = new mysqli($dbhost,$dbuser,$dbpass,$dbname);

function anti_injection($data){
  global $dbconn;
  $filter = mysqli_real_escape_string($dbconn,stripslashes(strip_tags(htmlspecialchars($data,ENT_QUOTES))));
  return $filter;
}	

if(isset($_POST['checkUser']))
{	
	$userName = anti_injection(trim($_POST['uid']));
	$pwd=anti_injection(trim($_POST['pwrd']));
	$pwd2 = md5($pwd);
		$stmt = $mysqli->prepare("SELECT p.id_operator,p.username,p.password,p.nm_operator,p.akses,p.blokir,p.id_instansi
								FROM m_operator p WHERE p.username=?");								
		$stmt->bind_param('s',$userName);
		$stmt->execute();
		$stmt->store_result();
		$row = $stmt->num_rows;
		
		if($row<1)
		{
			echo "<script>alert('Maaf, username tidak ditemukan !');</script>";
		}
		else
		{
			$stmt->bind_result($idoperator,$username,$pw,$nmoperator,$akses,$blokir,$idinstansi);
			$rek = $stmt->fetch();

			if($pw!==$pwd2){echo "<script>alert('Maaf, password yang Anda input salah !');</script>";
			}elseif($blokir=="Y"){echo "<script>alert('Maaf, status akun Anda terblokir !');</script>";
			}else{		
				if ($akses == "administrator"){
					session_start();
					unset($_SESSION['IDOPERATOR']); 
					unset($_SESSION['USERNAME']); 
					unset($_SESSION['NMOPERATOR']);
					unset($_SESSION['AKSES']);
					unset($_SESSION['IDINSTANSI']); 
					
					$_SESSION['IDOPERATOR'] = $idoperator;
					$_SESSION['USERNAME'] = $username;
					$_SESSION['NMOPERATOR'] = $nmoperator;
					$_SESSION['AKSES'] = $akses;
					$_SESSION['IDINSTANSI'] = $idinstansi;
					
					echo "	<script>
							document.location.href='operator/home.html';
							</script>";
				}
				if ($akses == "operator"){
					session_start();
					unset($_SESSION['IDOPERATOR']); 
					unset($_SESSION['USERNAME']); 
					unset($_SESSION['NMOPERATOR']);
					unset($_SESSION['AKSES']);
					unset($_SESSION['IDINSTANSI']);
					
					$_SESSION['IDOPERATOR'] = $idoperator;
					$_SESSION['USERNAME'] = $username;
					$_SESSION['NMOPERATOR'] = $nmoperator;
					$_SESSION['AKSES'] = $akses;
					$_SESSION['IDINSTANSI'] = $idinstansi;
					
					echo "	<script>
							document.location.href='operator/home.html';
							</script>";
				}				
			}
		}	
	
}else{
	echo "<script>document.location.href='login.html'</script>";
}	
	
?>