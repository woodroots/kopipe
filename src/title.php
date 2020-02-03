<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With");
	
	$url = $_POST["url"];
	$context = stream_context_create(array(
	    'http' => array('ignore_errors' => true)
	));
	$response = file_get_contents($url, false, $context);

	$pos = strpos($http_response_header[0], '200');
	if (!!$pos) {
		echo $response;
	} else {
		echo 'false';
	}
	
?>