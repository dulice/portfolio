AOS.init({
      offset: 40,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 300,
    });

function animateElements() {
    $('.progressbar').each(function () {
        var elementPos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        var percent = $(this).find('.circle').attr('data-percent');
        var percentage = parseInt(percent, 10) / parseInt(100, 10);
        var animate = $(this).data('animate');
        if (elementPos < topOfWindow + $(window).height() - 150 && !animate) {
            $(this).data('animate', true);
            $(this).find('.circle').circleProgress({
                startAngle: -Math.PI / 2,
                value: percent / 100,
                thickness: 10,
                size: 150,
                fill: {
                    color: '#fe9800'
                }
            }).on('circle-animation-progress', function (event, progress, stepValue) {
                $(this).find('div').text((stepValue * 100).toFixed(1) + "%");
            }).stop();
        }
    });
}

// Show animated elements
animateElements();
$(window).scroll(animateElements);

//img gallery
 $('.img-link').magnificPopup({
    type: 'image',
    mainClass: 'mfp-with-zoom', // this class is for CSS animation below
    gallery: {
    enabled: true
},
    zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function
        opener: function (openerElement) {
            return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
    }

});