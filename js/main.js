$(document).ready(function() {
    initSlider();

    function initTooltips() {
        document.querySelectorAll('.skills span[title]').forEach(el => {
            el.dataset.tooltip = el.getAttribute('title');
            el.removeAttribute('title');
        });

        tippy('.skills span', {
            content(reference) {
                return reference.dataset.tooltip;
            },
            animation: 'shift-away',
            theme: 'dark',
            delay: [0, 0],
            duration: [500, 0],
        });
    }

    // Функция загрузки блоков
    function loadBlocks(lang) {
        let files = ['about.html','skills.html','experience.html','portfolio.html'];
        $('#content-area').empty();
        files.forEach(file => {
            $('#content-area').append('<div class="block"></div>');
            $(`.block`).load(`blocks/${lang}/${file}`, function() {
                // контент полностью загрузился
                initSlider() // слайдеры обычные
                initAccordion();  // акордеон для h2
                initPortfolioSlider(); // портфолио слайдер
                initTooltips(); // тултипы
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