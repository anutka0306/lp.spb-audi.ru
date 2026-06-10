<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Message;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class MailerController extends AbstractController
{
    /**
     * @Route("/callback_form", name="callback_form")
     */
    public function callback_form(Request $request, MailerInterface $mailer){
        $token = "7357196560:AAHE-smtRk-geJmTKswjLhKglUzNp7ymexE";
        $chat_id = "-1001408803296";# ПИКСПБ Лексус

        // address: В2АЕ, СПБ4, K20
        if ($request->get('address') == 'СПБ4') {
            $token = "7357196560:AAHE-smtRk-geJmTKswjLhKglUzNp7ymexE";
            $chat_id = '-1001707616285'; // Пик СПБ4 Заявки
        } elseif ($request->get('address') == 'K20') {
            $token = "7357196560:AAHE-smtRk-geJmTKswjLhKglUzNp7ymexE";
            $chat_id = '-1001616535220'; // Пик К20 Vag Заявки
        }
		
        $arr = array(
            "Заявка с" => " с формы сайта https://audi.piksp.ru/ ",
            "Телефон" => $request->get('phone'),
           "Имя" => $request->get('name'),
           "Адрес" => $request->get('address'),
        );
        /*Цикл по массиву (собираем сообщение) */
        $txt = '';
        foreach($arr as $key => $value) {
            $txt .= "<b>".$key."</b>: ".htmlspecialchars($value)."\n";
        }

        if(!$this->sendToTelegram($token, $chat_id, $txt)) {
            return new JsonResponse(['error' => '<p>Ошибка при отправке в Telegram</p>']);
        }




        //Roistat
        $roistatData = array(
            'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : 'nocookie',
            'key'     => 'ODUxOTY2ZGIxZTAzOWRlNGU0M2IwYTBlOTgzNDczYzI6MTE2MDU4', // Ключ для интеграции с CRM, указывается в настройках интеграции с CRM.
            'title'   => 'Заявка с формы сайта https://audi.pikms.ru/', // Название сделки
            'comment' => '', // Комментарий к сделке
            'name'    => $request->get('name'), // Имя клиента
            'email'   => '', // Email клиента
            'phone'   => $request->get('phone'), // Номер телефона клиента
            'order_creation_method' => '', // Способ создания сделки (необязательный параметр). Укажите то значение, которое затем должно отображаться в аналитике в группировке "Способ создания заявки"
            'is_need_callback' => '1', // Если указано значение '1', на номер клиента будет инициироваться обратный звонок после создания заявки в Roistat (независимо от того, включен ли обратный звонок в Ловце лидов). Если указано значение '0', для данной формы обратный звонок инициироваться не будет (даже если в Ловце лидов включен обратный звонок).
            'callback_phone' => '74993911874', // Переопределяет номер, указанный в настройках обратного звонка.
            'sync'    => '0', //
            'is_need_check_order_in_processing' => '0', // Включение проверки заявок на дубли
            'is_need_check_order_in_processing_append' => '0', // Если создана дублирующая заявка, в нее будет добавлен комментарий об этом
            'is_skip_sending' => '0', // Не отправлять заявку в CRM.
            'fields'  => array(
                'Адрес' => $request->get('address'),
                'Марка'    => 'Audi',
                'Модель'   => '-',
                'Сайт'    => 'audi.piksp.ru',
                // Массив дополнительных полей. Если дополнительные поля не нужны, оставьте массив пустым.
                // Примеры дополнительных полей смотрите в таблице ниже.
                // Помимо массива fields, который используется для сделки, есть еще массив client_fields, который используется для установки полей контакта.
//                "charset" => "Windows-1251", // Сервер преобразует значения полей из указанной кодировки в UTF-8.
            ),
        );

        file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));
		

		
		$this->megaCall($request->get('phone'), '251', '78129995364');


        return new JsonResponse(['success'=>'<p>Спасибо! Ваша заявка отправлена.</p>']);
    }

    /**
     * @Route("/header_form", name="header_form")
     */
    public function header_form(Request $request, MailerInterface $mailer){
        $token = "7357196560:AAHE-smtRk-geJmTKswjLhKglUzNp7ymexE";
        $chat_id = "-1001408803296";# ПИКСПБ Лексус

        // address: В2АЕ, СПБ4, K20
        if ($request->get('address') == 'СПБ4') {
            $token = "7357196560:AAHE-smtRk-geJmTKswjLhKglUzNp7ymexE";
            $chat_id = '-1001707616285'; // Пик СПБ4 Заявки
        } elseif ($request->get('address') == 'K20') {
            $token = "7357196560:AAHE-smtRk-geJmTKswjLhKglUzNp7ymexE";
            $chat_id = '-1001616535220'; // Пик К20 Vag Заявки
        }

        $arr = array(
            "Заявка с" => " с формы сайта https://audi.piksp.ru/ ",
            "Телефон" => $request->get('phone'),
            "Имя" => $request->get('name'),
            "Адрес" => $request->get('address'),
        );
        /*Цикл по массиву (собираем сообщение) */
        $txt = '';
        foreach($arr as $key => $value) {
            $txt .= "<b>".$key."</b>: ".htmlspecialchars($value)."\n";
        }
        if(!$this->sendToTelegram($token, $chat_id, $txt)) {
            return new JsonResponse(['error' => '<p>Ошибка при отправке в Telegram</p>']);
        }


        //Roistat
        $roistatData = array(
            'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : 'nocookie',
            'key'     => 'ODUxOTY2ZGIxZTAzOWRlNGU0M2IwYTBlOTgzNDczYzI6MTE2MDU4', // Ключ для интеграции с CRM, указывается в настройках интеграции с CRM.
            'title'   => 'Заявка с формы сайта https://audi.pikms.ru/', // Название сделки
            'comment' => '', // Комментарий к сделке
            'name'    => $request->get('name'), // Имя клиента
            'email'   => '', // Email клиента
            'phone'   => $request->get('phone'), // Номер телефона клиента
            'order_creation_method' => '', // Способ создания сделки (необязательный параметр). Укажите то значение, которое затем должно отображаться в аналитике в группировке "Способ создания заявки"
            'is_need_callback' => '1', // Если указано значение '1', на номер клиента будет инициироваться обратный звонок после создания заявки в Roistat (независимо от того, включен ли обратный звонок в Ловце лидов). Если указано значение '0', для данной формы обратный звонок инициироваться не будет (даже если в Ловце лидов включен обратный звонок).
            'callback_phone' => '74993911874', // Переопределяет номер, указанный в настройках обратного звонка.
            'sync'    => '0', //
            'is_need_check_order_in_processing' => '0', // Включение проверки заявок на дубли
            'is_need_check_order_in_processing_append' => '0', // Если создана дублирующая заявка, в нее будет добавлен комментарий об этом
            'is_skip_sending' => '0', // Не отправлять заявку в CRM.
            'fields'  => array(
                'Адрес' => $request->get('address'),
                'Марка'    => 'Audi',
                'Модель'   => '-',
                'Сайт'    => 'audi.pikms.ru',
                // Массив дополнительных полей. Если дополнительные поля не нужны, оставьте массив пустым.
                // Примеры дополнительных полей смотрите в таблице ниже.
                // Помимо массива fields, который используется для сделки, есть еще массив client_fields, который используется для установки полей контакта.
//                "charset" => "Windows-1251", // Сервер преобразует значения полей из указанной кодировки в UTF-8.
            ),
        );

        file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));
		

		
		$this->megaCall($request->get('phone'), '251', '78129995364');



        return new JsonResponse(['success'=>'<p>Спасибо! Ваша заявка отправлена.</p>']);
    }

    /**
     * @Route("/callback_form_quiz", name="callback_form_quiz")
     */
    public function callback_form_quiz(Request $request, MailerInterface $mailer){
        $token = "7357196560:AAHE-smtRk-geJmTKswjLhKglUzNp7ymexE";
        $chat_id = "-1001408803296";# ПИКСПБ Лексус

        // address: В2АЕ, СПБ4, K20
        if ($request->get('address') == 'СПБ4') {
            $token = "7357196560:AAHE-smtRk-geJmTKswjLhKglUzNp7ymexE";
            $chat_id = '-1001707616285'; // Пик СПБ4 Заявки
        } elseif ($request->get('address') == 'K20') {
            $token = "7357196560:AAHE-smtRk-geJmTKswjLhKglUzNp7ymexE";
            $chat_id = '-1001616535220'; // Пик К20 Vag Заявки
        }

        $arr = array(
            "Заявка с" => " с квиза сайта https://audi.piksp.ru/ ",
            "Телефон" => $request->get('phone'),
            "Имя" => $request->get('name'),
            "Марка" => $request->get('mark'),
            "Услуга" => $request->get('offer'),
            "Лет" => $request->get('age'),
            "Пробег" => $request->get('probeg'),
            "Запчасти" => $request->get('zapchasti'),
            "Дата ремонта" => $request->get('date'),
            "Адрес" => $request->get('address'),
        );
        /*Цикл по массиву (собираем сообщение) */
        $txt = '';
        foreach($arr as $key => $value) {
            $txt .= "<b>".$key."</b>: ".htmlspecialchars($value)."\n";
        }
        if(!$this->sendToTelegram($token, $chat_id, $txt)) {
            return new JsonResponse(['error' => '<p>Ошибка при отправке в Telegram</p>']);
        }


        //Roistat
        $roistatData = array(
            'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : 'nocookie',
            'key'     => 'ODUxOTY2ZGIxZTAzOWRlNGU0M2IwYTBlOTgzNDczYzI6MTE2MDU4', // Ключ для интеграции с CRM, указывается в настройках интеграции с CRM.
            'title'   => 'Заявка с формы сайта https://audi.pikms.ru/', // Название сделки
            'comment' => 'Марка => ' . $request->get('mark') . ' | Услуга => ' .  $request->get('offer') . ' | Лет авто => ' . $request->get('age') . ' | Пробег => ' . $request->get('probeg') . ' | Запчасти => ' . $request->get('zapchasti') . ' | Дата ремонта => ' . $request->get('date'), // Комментарий к сделке
            'name'    => $request->get('name'), // Имя клиента
            'email'   => '', // Email клиента
            'phone'   => $request->get('phone'), // Номер телефона клиента
            'order_creation_method' => '', // Способ создания сделки (необязательный параметр). Укажите то значение, которое затем должно отображаться в аналитике в группировке "Способ создания заявки"
            'is_need_callback' => '0', // Если указано значение '1', на номер клиента будет инициироваться обратный звонок после создания заявки в Roistat (независимо от того, включен ли обратный звонок в Ловце лидов). Если указано значение '0', для данной формы обратный звонок инициироваться не будет (даже если в Ловце лидов включен обратный звонок).
            'callback_phone' => '74993911874', // Переопределяет номер, указанный в настройках обратного звонка.
            'sync'    => '0', //
            'is_need_check_order_in_processing' => '1', // Включение проверки заявок на дубли
            'is_need_check_order_in_processing_append' => '1', // Если создана дублирующая заявка, в нее будет добавлен комментарий об этом
            'is_skip_sending' => '0', // Не отправлять заявку в CRM.
            'fields'  => array(
                'Адрес' => $request->get('address'),
                'Марка'    => $request->get('mark'),
                'Сайт'    => 'audi.pikms.ru',
                // Массив дополнительных полей. Если дополнительные поля не нужны, оставьте массив пустым.
                // Примеры дополнительных полей смотрите в таблице ниже.
                // Помимо массива fields, который используется для сделки, есть еще массив client_fields, который используется для установки полей контакта.
//                "charset" => "Windows-1251", // Сервер преобразует значения полей из указанной кодировки в UTF-8.
            ),
        );

        file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));
		

		$this->megaCall($request->get('phone'), '251', '78129995364');


        return new JsonResponse(['success'=>'<p>Спасибо! Ваша заявка отправлена.</p>']);
    }

    public function megaCall($user, $manager, $clid = '') {

        if (strtotime('9:00:00') < time() && strtotime('20:50:00') > time()) {
            $ch = curl_init(); 
            curl_setopt($ch, CURLOPT_URL, 'https://vats332138.megapbx.ru/crmapi/v1/makecall');
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['cmd: makeCall', 'X-API-KEY: 9afaf8e5-87cf-41b4-b8d9-0780038df43c']);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, [
                'phone' => $user,       // client - Номер клиента, на который последует звонок - обязательно.
                'user'  => $manager,    // login or ext - Сотрудник, который будет соединен с клиентом. Допускается логин или короткий номер - обязательно.
                'clid'  => $clid        // Исходящий номер для звонка - необязательно.
            ]);
            $output = curl_exec($ch);
            curl_close($ch);
        }
    }

    private function sendToTelegram(string $token, string $chatId, string $text): bool
    {
        $url = "https://api.telegram.org/bot{$token}/sendMessage";

        $data = [
            'chat_id' => $chatId,
            'text' => $text,
            'parse_mode' => 'HTML'
        ];

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_TIMEOUT => 10,
        ]);

        $result = curl_exec($ch);

        if ($result === false) {
            curl_close($ch);
            return false;
        }

        $response = json_decode($result, true);
        curl_close($ch);

        return isset($response['ok']) && $response['ok'] === true;
    }
}
