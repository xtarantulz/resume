$(document).ready(function() {
    initSlider();

    function initTooltips() {
        tippy('.skills span[title]', {
            content(reference) {
                const title = reference.getAttribute('title');
                reference.removeAttribute('title');
                return title;
            },
            animation: 'shift-away',
            theme: 'dark',
        });
    }

    // Функция загрузки блоков
    function loadBlocks(lang) {
        let files = ['about.html','skills.html','experience.html','portfolio.html'];
        $('#content-area').empty();
        files.forEach(file => {
            $('#content-area').append('<div class="block"></div>');
            $(`.block`).last().load(`blocks/${lang}/${file}`, function() {
                // контент полностью загрузился
                initSlider() // слайдеры обычные
                initAccordion();  // акордеон для h2
                initPortfolioSlider(); // портфолио слайдер
                initTooltips() // тултипы
            });
        });
    }

    // Инициализация: грузим украинский
    loadBlocks('uk');

    // Переключение табов
    $('.tab').click(function() {
        $('.tab').removeClass('active');
        $(this).addClass('active');
        let lang = $(this).data('lang');
        loadBlocks(lang);
    });
});