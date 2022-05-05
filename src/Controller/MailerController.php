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
        $token = "2102312578:AAF6iR_1pAUR4GY1Vg8TwgF3CsIBCKWQyBg";
        $chat_id = "-1001677654724";# Заявки VAG-PIK

        $arr = array(
            "Заявка с" => " с формы сайта https://audi.pikms.ru/ ",
            "Телефон" => $request->get('phone'),
           "Имя" => $request->get('name'),
        );
        /*Цикл по массиву (собираем сообщение) */
        $txt = '';
        foreach($arr as $key => $value) {
            $txt .= "<b>".$key."</b>: ".htmlspecialchars($value)."\n";
        }
        $sendTextToTelegram = file_get_contents("https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&parse_mode=html&text=".rawurlencode($txt))."\n";
        if (!$sendTextToTelegram){
            return new JsonResponse(['error'=>'<p>Ошибка при отправке в Telegram</p>']);
        }

       /* $to = 'info@piksp.ru';

        $email = (new Email())
            ->from('info@my-side.online')
            ->to((string)$to)
            ->subject('Новая заявка с сайта Piksp.ru')
            ->html('<p>Новая заявка с сайта Piksp.ru</p>
            <p>Телефон отправителя: ' . $request->get('phone') . '</p>'
            );
        $mailer->send($email);*/

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
            'is_need_callback' => '0', // Если указано значение '1', на номер клиента будет инициироваться обратный звонок после создания заявки в Roistat (независимо от того, включен ли обратный звонок в Ловце лидов). Если указано значение '0', для данной формы обратный звонок инициироваться не будет (даже если в Ловце лидов включен обратный звонок).
            'callback_phone' => '', // Переопределяет номер, указанный в настройках обратного звонка.
            'sync'    => '0', //
            'is_need_check_order_in_processing' => '1', // Включение проверки заявок на дубли
            'is_need_check_order_in_processing_append' => '1', // Если создана дублирующая заявка, в нее будет добавлен комментарий об этом
            'is_skip_sending' => '1', // Не отправлять заявку в CRM.
            'fields'  => array(
                'address' => 'И31АС4',
                'mark'    => 'Audi',
                'model'   => '-',
                'site'    => 'audi.pikms.ru',
                // Массив дополнительных полей. Если дополнительные поля не нужны, оставьте массив пустым.
                // Примеры дополнительных полей смотрите в таблице ниже.
                // Помимо массива fields, который используется для сделки, есть еще массив client_fields, который используется для установки полей контакта.
                "charset" => "Windows-1251", // Сервер преобразует значения полей из указанной кодировки в UTF-8.
            ),
        );

        file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));





        return new JsonResponse(['success'=>'<p>Спасибо! Ваша заявка отправлена.</p>']);
    }
}
