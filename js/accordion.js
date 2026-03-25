function initAccordion() {
    let contents = $('.block .content');

    // сначала закрываем все, кроме первого
    contents.hide();
    contents.first().show().prev('h2').addClass('active'); // первый открыт

    $('.block h2').off('click').on('click', function() {
        let content = $(this).next('.content');

        // закрываем все остальные
        contents.not(content).slideUp(300).prev('h2').removeClass('active');

        // открываем / закрываем этот блок
        content.slideToggle(300);
        $(this).toggleClass('active'); // переключаем класс для стрелки
    });
}