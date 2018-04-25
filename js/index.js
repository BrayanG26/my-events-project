$(document).ready(function () {
    var navbar = $("#navbar")[0];
    var sticky = navbar.offsetTop;
    $(window).scroll(function () {
        
        console.log(sticky);
        // console.log(sticky);
        /* if (window.pageYOffset >= sticky) {
            navbar.addClass("sticky")
        } else {
            navbar.removeClass("sticky");
        } */
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    });
});


