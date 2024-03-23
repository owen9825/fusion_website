// https://codepen.io/andiio/pen/ARxgGb
// Notice that this depends on jQuery.

$(function(){
    // https://stackoverflow.com/a/19561886/1495729
    //  This is needed for mobile.
    $('.dropdown-toggle').hover(function() {
        $(this).addClass('open');  // Notice that these are not Popper classes
    },
    function() {
        $(this).removeClass('open');
    });
});

$(document).ready(function () {
        const nearTop = 300;  // We set our header to have padding-top of 5rem == 80px.
        $('html').on('DOMMouseScroll mousewheel', function (e) {
            if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
                //scrolling down
                $("#header-nav").addClass("hide-nav-bar");
            } else {
                //scrolling up
                $("#header-nav").removeClass("hide-nav-bar");
                console.log(`We are at ${window.scrollY}`);
            }
            if (window.scrollY < nearTop) {
                $("#header-nav").removeClass("bg-glass-opaque");
            } else {
                $("#header-nav").addClass("bg-glass-opaque");
            }
        });
        $('.navbar-toggler').on('click', function (event) {
            console.log('You clicked the navbar-toggler');
            if ($(this).hasClass('clicked-open')) {
                $(this).removeClass('clicked-open');
                if (window.scrollY < nearTop) {
                    $("#header-nav").removeClass('bg-glass-opaque');
                }
            } else {
                $(this).addClass('clicked-open');
                $("#header-nav").addClass('bg-glass-opaque');
            }
        });

        // Here we're adding the same classes as Popper, so that mouse-over behaves the same as
        // what Popper would do, for a click.
        var dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        dropdownToggles.forEach(function(toggle) {
            var dropdownUnorderedList = toggle.nextElementSibling;
            var parentLi = toggle.parentElement;
            const revealDropdown = () => {
                toggle.classList.add('show');
                // Open the clicked dropdown
                dropdownUnorderedList.classList.add('show');
                // For position.
                dropdownUnorderedList.setAttribute('data-bs-popper', 'static');
            }
            parentLi.addEventListener('mouseenter', function(event) {
                if (!dropdownUnorderedList.classList.contains('show')) {
                    // Close any other dropdowns
                    var openDropdowns = document.querySelectorAll('.dropdown-menu.show');
                    var reveal = true;
                    openDropdowns.forEach(function(openDropdown) {
                        if (dropdownUnorderedList !== openDropdown) {
                            var toggleTarget = openDropdown.previousElementSibling;
                            if (toggleTarget.classList.contains('clickedOpen')) {
                                reveal = false;
                            } else {
                                openDropdown.classList.remove('show');
                                openDropdown.removeAttribute('data-bs-popper');
                            }
                        }
                    });
                    if (reveal) {
                        revealDropdown();
                    }
                }
            });
            toggle.addEventListener('click', function(event) {
                if (toggle.classList.contains('clicked-open')) {
                    // Popper has processing the click first, so we can't use 'show'
                    console.log('Closing the dropdown');
                    toggle.classList.remove('show');
                    toggle.classList.remove('clicked-open');
                    toggle.removeAttribute('data-bs-popper');
                } else {
                    console.log('Opening the menu');
                    revealDropdown();
                    toggle.classList.add('clicked-open');
                }
            });
            parentLi.addEventListener('mouseleave', function(event) {
                // https://stackoverflow.com/a/57321303/1495729
                // todo: mouse movement margin
                // Eligible for removal
                if (!dropdownUnorderedList.classList.contains('open')) {
                    // What about mobile?
                    dropdownUnorderedList.classList.remove('show');
                    dropdownUnorderedList.removeAttribute('data-bs-popper');
                    toggle.classList.remove('show');
                }
            });
        });
    }
);
