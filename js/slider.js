function initSlider() {
    $('.slider').each(function () {
        let slider = $(this);
        let slides = slider.find('img');
        if(slides.length===0) return;

        let index=0, animating=false;
        slides.hide().eq(index).show().addClass('active');

        function showSlide(i){
            if(animating || i===index) return;
            animating=true;
            slides.eq(index).fadeOut(500);
            slides.eq(i).fadeIn(500,function(){ animating=false; });
            slides.eq(index).removeClass('active');
            slides.eq(i).addClass('active');
            index=i;
        }

        slider.find('.next').click(function(){ showSlide((index+1)%slides.length); });
        slider.find('.prev').click(function(){ showSlide((index-1+slides.length)%slides.length); });

        let interval=setInterval(function(){ showSlide((index+1)%slides.length); },5000);

        slider.hover(function(){ clearInterval(interval); },
            function(){ interval=setInterval(function(){ showSlide((index+1)%slides.length); },5000); });
    });
}