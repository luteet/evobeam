<?php 
	
	// Переменные

	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$question = $_POST['question'];

	// Переменные
	
	

	// Сообщение для почты

	$message_all = 
	"Сообщение из сайта ...: " .
	"\n\nИмя: " . $name.
	"\nТелефон: " . $phone.
	"\nE-mail: " . $email.
	"\nВопрос: " . $question;

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