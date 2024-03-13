// https://codepen.io/andiio/pen/ARxgGb
// Notice that this depends on jQuery.

$(function(){
    // https://stackoverflow.com/a/19561886/1495729
    //
    $('.dropdown-toggle').hover(function() {
        $(this).addClass('open');
    },
    function() {
        $(this).removeClass('open');
    });
});

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
                if (toggle.classList.contains('clickedOpen')) {
                    toggle.classList.remove('clickedOpen');
                } else if (toggle.classList.contains('show')) {
                    // Popper is processing the click first, so if 'show' is here now, the toggle has just been opened.
                    toggle.classList.add('clickedOpen');
                } else if (toggle.classList.contains('open')) {
                    // The jQuery behaviour above added the 'open' − we can use that as a hint that they've clicked
                    // this button.
                    toggle.classList.add('clickedOpen');
                    revealDropdown();
                } else {
                    toggle.classList.remove('clickedOpen');
                }
            });
            parentLi.addEventListener('mouseleave', function(event) {
                // https://stackoverflow.com/a/57321303/1495729
                if (!toggle.classList.contains('clickedOpen')) {
                    dropdownUnorderedList.classList.remove('show');
                    dropdownUnorderedList.removeAttribute('data-bs-popper');
                    toggle.classList.remove('show');
                }
            });
        });
    }
);
