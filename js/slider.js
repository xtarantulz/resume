function initSlider() {
    let slides = $('.slider img');
    if(slides.length === 0) return;

    let index = 0;
    let animating = false; // флаг анимации
    slides.hide().eq(index).show().addClass('active');

    function showSlide(i) {
        if(animating || i === index) return; // если уже анимируем или тот же слайд
        animating = true;

        slides.eq(index).fadeOut(500);
        slides.eq(i).fadeIn(500, function() {
            animating = false;
        });
        slides.eq(index).removeClass('active');
        slides.eq(i).addClass('active');
        index = i;
    }

    $('.slider .next').off('click').on('click', function() {
        showSlide((index + 1) % slides.length);
    });

    $('.slider .prev').off('click').on('click', function() {
        showSlide((index - 1 + slides.length) % slides.length);
    });

    // автоперемикание с проверкой флага
    setInterval(function() {
        showSlide((index + 1) % slides.length);
    }, 5000);
}