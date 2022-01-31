<?php 
	
	// Переменные

	$name = $_POST['name'];
	$tel = $_POST['tel'];
	$email = $_POST['email'];

	// Переменные
	
	

	// Сообщение для почты

	$message_all = 
	"Сообщение из сайта ...: " .
	"\n\nИмя: " . $name.
	"\nТелефон: " . $tel.
	"\nE-mail: " . $email;

	// Сообщение для почты



	// Отправка на почту

	$ok = mail('info@dekolinija.lt', 'Theme', $message_all); // mail('На какую почту отправлять', 'Тема сообщения', 'Сообщение'); 

	// Отправка на почту



	// Проверка отправки на почту

	if ($ok){
		header('Location: ' . $_SERVER['HTTP_REFERER']);
		echo 'Сообщение отправлено!';
		sleep(2);
		
	}else{
		echo 'Фэйл(((';
	}

	// Проверка отправки на почту
 ?>