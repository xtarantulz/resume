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
    async function loadBlocks(lang) {
        let files = [
            'about.html',
            'skills.html',
            'experience.html',
            'portfolio.html'
        ];

        const $area = $('#content-area');

        $area.css({
            opacity: 0,
            transition: 'opacity 0.25s ease'
        });

        $area.empty();

        // грузим ВСЕ параллельно
        let responses = await Promise.all(
            files.map(file => $.get(`blocks/${lang}/${file}`))
        );

        // ВАЖНО: вставляем строго по порядку
        responses.forEach(html => {
            let $block = $('<div class="block"></div>');
            $block.html(html);
            $area.append($block);
        });

        initAll();

        requestAnimationFrame(() => {
            $area.css('opacity', 1);
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