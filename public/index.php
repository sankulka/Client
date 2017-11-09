<?php
require '../vendor/autoload.php';
require '../vendor/slim/slim/Slim/App.php';

$app = new \Slim\App();

function isOwner () {
	$cookie_name = "credentials";
	if (!isset($_COOKIE[$cookie_name]))
		return false;
	$cred = json_decode($_COOKIE[$cookie_name], true);
	if ($cred['role'] != 'owner')
		return false;
	return true;
}

//slim application routes
$app->get('/', function ($request, $response, $args) { 
/*	$cookie_name = "cred";
	if (!isset($_COOKIE[$cookie_name]))
		print_r('cookie note set. false');
	
	$cred = json_decode($_COOKIE[$cookie_name], true);
	print_r ($cred['rrr']);
	
	print_r ('got the cookies');
	
*/	$index = 'index.html';
	if (file_exists($index))
		return $response->write(file_get_contents($index));

});

$app->delete('/webGalleryFile/{id}', function ($request, $response, $args) {
	if (isOwner() == false)
		return;
	
	$dir = "./gallery/";
	
	$file = $args['id'];
	$file = str_replace('_', '.', $file);
	
	$file = $dir . $file;
	return (unlink($file));
});

$app->get('/webGalleryFiles', function ($request, $response, $args) { 
	$galleryDir = "./gallery/";
	$files = scandir($galleryDir);
	$filesArray = array();
	foreach($files as $file) {
		if ($file != "." && $file != "..") {
			array_push($filesArray, $file);
		}
	}
	return $response->withJson ($filesArray);
});

$app->post('/webGalleryFile', function () {
	if (isOwner() == false)
		return;
	
	$dir = './gallery/';
	if(isset($_FILES['file'])){
		//The error validation could be done on the javascript client side.
		$errors= array();        
		$name = $_FILES['file']['name'];
		$name = str_replace('_', '', $name);
		$file_name = $name;
		$file_size =$_FILES['file']['size'];
		$file_tmp =$_FILES['file']['tmp_name'];
		$file_type=$_FILES['file']['type'];   
		$file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
		$extensions = array("jpeg","jpg","png");        
		if(in_array($file_ext,$extensions )=== false){
		 $errors[]="image extension not allowed, please choose a JPEG or PNG file.";
		}
		if($file_size > 2097152){
		$errors[]='File size cannot exceed 2 MB';
		}               
		if(empty($errors)==true){
			move_uploaded_file($file_tmp, $dir.$file_name);
			print_r (" uploaded file: " . $file_name);
		}else{
			print_r ($errors);
		}
	}
});

$app->get('/webTestimonials', function ($request, $response, $args) {
	
	$destination = './testimonials/';
	$testFileName = $destination . "testimonials.json";
	$testFile = fopen ($testFileName, "r");
	$data = file_get_contents ($testFileName);
	$obj = json_decode($data, true);

	if ($obj == null)
		$obj = array();
	
	return $response->withJson ($obj);
});

$app->delete('/webTestimonial/{date}', function ($request, $response, $args) {
	if (isOwner() == false)
		return;	

	$dir = './testimonials/';
	$testFileName = $dir . "testimonials.json";
	$testFile = fopen ($testFileName, "r");
	$data = file_get_contents ($testFileName);
	$obj = json_decode($data, true);
	fclose ($testFile);
	
	$date = $args['date'];
	
	$newObj = array();
	foreach ($obj as $testimonial) {
		if ($testimonial['date'] == $date) {
			print_r (' match date ');
			$filesToDelete = $testimonial['fileInput']['files'];
			foreach ($filesToDelete as $fileToDelete) {
				$file = $dir . $fileToDelete;
				unlink($file);
			}
		} else {
			array_push ($newObj, $testimonial);
		}
	}
	
	$testFile = fopen ($testFileName, "w+");
	file_put_contents ($testFileName, json_encode($newObj));
	fclose ($testFile);
	print_r ('Testimonial deleted');
});


$app->post('/webTestimonial', function ($request, $response, $args) {
	if (isOwner() == false)
		return;
	
	$entry = $request->getParsedBody();

	$fileInput = $entry['fileInput'];
	$files = $fileInput['files'];
	//$nurelServer = 'http://localhost:8005';
	$nurelServer = 'http://172.104.50.112:3000';
	$server = $nurelServer . '/testimonialFile/';
	$destination = './testimonials/';
	
	foreach ($files as $file) {
		$source = $server . $file;
		$target = $destination . $file;
		
		$data = file_get_contents ($source);
		$targetFile = fopen ($target, "w+");
		fputs ($targetFile, $data);
		fclose ($targetFile);
	}
	
	$testFileName = $destination . "testimonials.json";
	$testFile = fopen ($testFileName, "a");
	
	$data = file_get_contents ($testFileName);
	$obj = json_decode($data, true);

	if ($obj == null)
		$obj = array();
	array_unshift($obj, $entry);
	file_put_contents ($testFileName, json_encode($obj));
	
	fclose ($testFile);
	print_r ('Testimonial written');

	/* This is for downloading larger files
	$ch = curl_init();
	$file = 'SNKK-23-IMG_20170303_121906.jpg';
	$server = 'http://localhost:8005/testimonialFile/';
	$source = $server . $file;
	curl_setopt($ch, CURLOPT_URL, $source);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$data = curl_exec ($ch);
	curl_close ($ch);

	$dest = "./testimonials/";
	$dest .= $file;
	$file = fopen($dest, "w+");
	fputs($file, $data);
	fclose($file);
	*/
});

$app->run();
?>