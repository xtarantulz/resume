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
        let files = [
            'about.html',
            'skills.html',
            'experience.html',
            'portfolio.html'
        ];

        const $area = $('#content-area');

        // скрываем чтобы не было "мигания"
        $area.css({
            opacity: 0,
            transition: 'opacity 0.25s ease'
        });

        // очищаем
        $area.empty();

        // грузим все блоки параллельно
        let requests = files.map(file => {
            return $.get(`blocks/${lang}/${file}`).then(html => {
                let $block = $('<div class="block"></div>');
                $block.html(html);
                $area.append($block);
            });
        });

        $.when(...requests).done(function () {
            initAll();

            requestAnimationFrame(() => {
                $area.css('opacity', 1);
            });
        });
    }

    function initAll() {
        initSlider();
        initAccordion();
        initPortfolioSlider();
        initTooltips();
    }

    // старт
    loadBlocks('uk');

    // Переключение табов
    $('.tab').click(function() {
        $('.tab').removeClass('active');
        $(this).addClass('active');
        let lang = $(this).data('lang');
        loadBlocks(lang);
    });
});