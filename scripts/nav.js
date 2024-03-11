// https://codepen.io/andiio/pen/ARxgGb
// Notice that this depends on jQuery.

$(document).ready(function () {
        $('html').on('DOMMouseScroll mousewheel', function (e) {
            if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
                //scrolling down
                $("#header-nav").addClass("hide-nav-bar");
            } else {
                //scrolling up
                $("#header-nav").removeClass("hide-nav-bar");
            }
        });
    }
);
