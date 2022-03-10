//toggle nav button 
$(".navbar-toggler").click(() => {
    $(".toggle").toggleClass("fa-close");
    $(".toggle").toggleClass("fa-bars");
})

//collapse when click link
$(".nav-item").click(() => {
    $(".navbar-collapse").toggleClass("show");
    $(".toggle").toggleClass("fa-close");
    $(".toggle").toggleClass("fa-bars");
})

//home scroll
$(window).scroll(() => {
    const y = $(window).scrollTop();
    $("#home").css({
        "background-positionY": y * 0.7,
    })
})

// scroll to top
$(window).scroll(() => {
const windowHeight = $(window).innerHeight();
const scrollHeight = $(window).scrollTop();
    if(scrollHeight > windowHeight) {
        $("#nav").addClass("position-fixed").slideDown(500);
        $(".to-top").css({
            "display": "inline-block",
        })
    }
    else {
        $("#nav").removeClass("position-fixed");
        $(".to-top").css({
            "display": "none",
        })
    }
})

// active link
function setActive(current) {

        $(".nav-link").removeClass("active");

        $(`.nav-link[href='#${current}']`).addClass('active');

    }

    function navScroll() {

        let currentSection = $("section[id]");
        currentSection.waypoint(function (direction) {

            if(direction == "down"){
                let currentSectionId = $(this.element).attr('id');
                setActive(currentSectionId);
            }

        },{ offset:'150px' });

        currentSection.waypoint(function (direction) {

            if(direction == "up"){
                let currentSectionId = $(this.element).attr('id');
                setActive(currentSectionId);
            }

        },{ 
            offset: function() { return -$(this.element).height() + 155; }
         });

    }

    navScroll();


// send mail 
(function () {
     emailjs.init('YOUR_USER_ID');
})();

const contactForm = $("#contact-form");

contactForm.on("submit", (e) => {
    e.preventDefault();

    var templateParams = {
        to_name : $("#user-name").val(),
        from_name : $("#email").val(),
        message : $("#message").val()
    };
    
    emailjs.send("service_qmoo3op", "template_0dm1xqb", templateParams, "E6yEPUzQVPon4svn2")
        .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
        console.log('FAILED...', error);
    });
     $("#user-name").val("");
    $("#email").val("");
    $("#message").val("")
})

//mouse animation
var c = document.getElementById("canvas");
var ct = c.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerHeight;

c.width = tx;
c.height = ty;

var mousex = 0;
var mousey = 0;

var grav = 0.99;
c.strokeWidth = 5;
function randomColor() {
    return (
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.ceil(Math.random() * 10) / 10 +
        ")"
    );
}

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.color = randomColor();
    this.update = function () {
        ct.beginPath();
        ct.globalAlpha = 0.5;
        ct.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ct.fillStyle = this.color;
        ct.fill();
    };

    //console.log(randomColor());
}

var ball = [];
var move = 0;
addEventListener("mousemove", function () {
    mousex = event.clientX;
    mousey = event.clientY;
    if (ball.length < 100 && move++ == 10) {
        ball.push(new Ball(mousex, mousey));
        move = 0;
    }

});

function animate(x, y) {
    requestAnimationFrame(animate);

    ct.clearRect(0, 0, tx, tx);
    for (var i = 0; i < ball.length; i++) {
        ball[i].update();
        ball[i].y += 2;
        ball[i].radius = ball[i].radius - (ball[i].radius * 0.009);
        if (ball[i].y >= ty || ball[i].radius <= 0) {
            ball[i].color = randomColor();
            ball.splice(i, 1)
        }
    }
}
animate(mousex, mousey);

//loading animation
$(window).on("load", function(){
    $(".loading").fadeOut(function() {
        $(this).remove();
    })
})
