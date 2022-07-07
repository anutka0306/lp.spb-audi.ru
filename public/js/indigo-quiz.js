// $(document).ready(function(){
var indigo_quiz_step = 1;
var indigo_quiz_page = 7;
var percent = 0;
var indigo_quiz_select = [];


// $(".indigo_quiz_card").click(function () {
//     alert("true");
// });

$('.indigo_quiz_card').click(function() {
    indigo_quiz_select[$('#page_' + indigo_quiz_step).attr('data-title')] = $(this).attr('data-select');
    // console.log(indigo_quiz_select);
    hidden_page(indigo_quiz_step);
    indigo_quiz_step ++;
    show_page(indigo_quiz_step);
    change_percent();
    // console.log(indigo_quiz_select);
});

$('#revert_button').click(function() {
    if(indigo_quiz_step != 1) {
        hidden_page(indigo_quiz_step);
        indigo_quiz_step--;
        show_page(indigo_quiz_step);
        change_percent();
    }
});

$('#indigo_quiz_submit').click(function() {
    if($('#indigo_quiz_name').val().length == 0){
        alert('Укажите ваше имя');
    }

    if($('#indigo_quiz_phone').val().length < 16){
        alert('Укажите правильный номер телефона');
    }

    if($('#indigo_quiz_name').val().length != 0 && $('#indigo_quiz_phone').val().length == 16) {
        hidden_page(indigo_quiz_step);
        indigo_quiz_step++;
        show_page(indigo_quiz_step);
        change_percent();
        indigo_quiz_select['name'] = $('#indigo_quiz_name').val();
        indigo_quiz_select['phone'] = $('#indigo_quiz_phone').val();
        // console.log(indigo_quiz_select);

        $.ajax({
            url: "/callback_form_quiz",
            type: "POST", //метод отправки
            dataType: "html", //формат данных

            data: {
                'phone': indigo_quiz_select['phone'],
                'name': indigo_quiz_select['name'],
                'mark': indigo_quiz_select['Модель'],
                'offer': indigo_quiz_select['Услуга'],
                'age': indigo_quiz_select['Лет транспорту'],
                'probeg': indigo_quiz_select['Пробег'],
                'date': indigo_quiz_select['Дата ремонта'],
                'zapchasti': indigo_quiz_select['Запчасти'],




            },
            success: function (response) { //Данные отправлены успешно
                //$('.callback-popup-body').html('<p style="text-align: center; font-weight: 700; padding: 20px;">Спасибо! Ваша заявка отправлена.</p>');
                // $.magnificPopup.close();
                console.log(response);
                // window.location.replace("/confirm");
            },
            error: function (response) { // Данные не отправлены
                console.log('error');
            }
        });

    }
});

function hidden_page(e) {
    $('#page_' + e).addClass('indigo_quiz_page_opacity');
    $('#header_' + e).addClass('indigo_quiz_page_opacity');
    setTimeout(() => remove_page(e), 500);
}

function remove_page(e){
    $('#page_' + e).addClass('indigo_quiz_page_hidden');
    $('#header_' + e).addClass('indigo_quiz_page_hidden');
}

function show_page(e) {
    if(e <= indigo_quiz_page) {
        $('#page_' + e).removeClass('indigo_quiz_page_opacity');
        $('#header_' + e).removeClass('indigo_quiz_page_opacity');
        setTimeout(() => $('#page_' + e).removeClass('indigo_quiz_page_hidden'), 500);
        setTimeout(() => $('#header_' + e).removeClass('indigo_quiz_page_hidden'), 500);
    } else {
        $('#page_' + e).removeClass('indigo_quiz_page_opacity');
        $('#header_' + e).removeClass('indigo_quiz_page_opacity');
        setTimeout(() => $('#page_thanks').removeClass('indigo_quiz_page_hidden'), 500);
        // setTimeout(() => $('.indigo_quiz').addClass('indigo_quiz_page_opacity'), 2000);
        setTimeout(() => $('.indigo_quiz').addClass('indigo_quiz_page_scroll'), 2500);
        setTimeout(() => $('.indigo_quiz_body').addClass('indigo_quiz_page_scroll'), 2500);
        setTimeout(() => $('.indigo_quiz_button').addClass('indigo_quiz_page_opacity'), 2000);
        setTimeout(() => $('.indigo_quiz_button').addClass('indigo_quiz_button_hidden'), 2500);
        // setTimeout(() => $('.indigo_quiz').addClass('indigo_quiz_page_hidden'), 3100);

    }
}

function change_percent() {
    var indigo_quiz_step_local = indigo_quiz_step;
    indigo_quiz_step_local --;
    percent = Math.floor((100 / indigo_quiz_page) * indigo_quiz_step_local);
    $('#indigo_quiz_progress').width(percent + '%');
    $('#indigo_quiz_progress_percent').text(percent + '%');
}


// }