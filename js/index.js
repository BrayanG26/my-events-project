$(document).ready(function () {
    var tape = $(".tape")[0];
    var $contenido = $(".main")[0];
    var sticky = tape.offsetTop;
    $(window).scroll(function () {
        /* if (window.pageYOffset >= sticky) {
            navbar.addClass("sticky")
        } else {
            navbar.removeClass("sticky");
        } */
        if (window.pageYOffset >= sticky) {
            tape.classList.add("sticky")
            // $(".main").addClass("main");
            // $contenido.css({"paddinTop":"200px"});
        } else {
            tape.classList.remove("sticky");
            // $contenido.css({ "paddinTop": "" });
            // $(".main").removeClass("main");
        }
    });
});


