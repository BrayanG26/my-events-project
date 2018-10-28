// Get the modal
var modal = document.getElementById('id01');

$(document).ready(function() {
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    $('#logIn').click(function(e) {
        modal.style.display = "block";
    });

    $('.close-modal').click(function(e) {
        modal.style.display = "none";
    });
})

/* Este script no sirve para nada */