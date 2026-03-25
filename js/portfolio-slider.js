function initPortfolioSlider() {
    const $slider = $('.portfolio-list');
    const $projects = $('.portfolio-item-new');
    let currentProject = 0;

    function showProject(index) {
        const offset = -index * 100; // сдвиг на 100% ширины контейнера
        $slider.css('transform', `translateX(${offset}%)`);
    }

    $('.portfolio-next').click(function() {
        currentProject = (currentProject + 1) % $projects.length;
        showProject(currentProject);
    });

    $('.portfolio-prev').click(function() {
        currentProject = (currentProject - 1 + $projects.length) % $projects.length;
        showProject(currentProject);
    });
}