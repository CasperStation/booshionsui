 function animateInfinity(element, duration, bounds, direction = 'left') {
    let centerX = (bounds.leftMin + bounds.leftMax) / 2;
    let centerY = (bounds.bottomMin + bounds.bottomMax) / 2;
    let width = (bounds.leftMax - bounds.leftMin) / 2;
    let height = (bounds.bottomMax - bounds.bottomMin) / 2;

    function calculatePosition(t) {
        let angle = t * 2 * Math.PI;
        let x = centerX + width * Math.sin(angle);
        let y = centerY + height * Math.sin(2 * angle) / 2;
        if (direction === 'right') {
            x = centerX - width * Math.sin(angle);
        }
        return { x, y };
    }

    function loopAnimation() {
        $({ t: 0 }).animate({ t: 1 }, {
            duration: duration,
            easing: 'linear',
            step: function (now) {
                var pos = calculatePosition(now);
                $(element).css({
                    left: pos.x + '%',
                    bottom: pos.y + '%'
                });
            },
            complete: function () {
                loopAnimation();
            }
        });
    }

    loopAnimation();
}

function randomlyActivateElement(selector, activeClass, activeDuration, delayDuration) {
    let lastActiveElement = null;

    function activateRandomElement() {
        const elements = $(selector);
        const inactiveElements = elements.not(`.${activeClass}`);

        // Ensure there are elements to activate
        if (inactiveElements.length > 0) {
            let randomElement;

            do {
                randomElement = inactiveElements.eq(Math.floor(Math.random() * inactiveElements.length));
            } while (randomElement.is(lastActiveElement) && inactiveElements.length > 1);

            // Add the active class
            randomElement.addClass(activeClass);

            // Remove the active class after the specified duration
            setTimeout(() => {
                randomElement.removeClass(activeClass);
            }, activeDuration);

            // Track the last active element
            lastActiveElement = randomElement;
        }
    }

    // Initial call
    activateRandomElement();

    // Repeat the activation with the specified delay
    setInterval(activateRandomElement, delayDuration);
}

function playBackgroundMusic(audioSrc, volume) {
    const audio = new Audio(audioSrc);
    audio.volume = volume;
    audio.preload = 'auto';

    let hasPlayed = false;
    let isReadyToPlay = false;

    $(audio).on('canplaythrough', function () {
        isReadyToPlay = true;
        console.log("Audio is fully loaded and ready to play.");
    });

    function handleClick() {
        if (!hasPlayed && isReadyToPlay) {
            audio.play().then(() => {
                console.log("Audio started successfully.");
                hasPlayed = true;
            }).catch(function (error) {
                console.warn("Failed to start audio.", error);
            });
        }
    }

    $(document).one('click', handleClick);
}

function action_menu() {
    $('.burger').click(function () {
        $('header').toggleClass('open');
    });
}

function action_play() {
    $('.play').click(function() {
        
      $(this).addClass('hidden');
      $('.block-video .video-box .video-deco').addClass('hidden');
        
      var iframe = $('<iframe>', {
        src: 'https://www.youtube.com/embed/6bzw0C5XHI0?controls=1&modestbranding=1&rel=0&autoplay=1',
        title: 'Booshi Video',
        frameborder: '0',
        allow: 'autoplay; encrypted-media; fullscreen',
        allowfullscreen: true
      });
      $('.iframe-box').html(iframe);
    });
}


function action_copy() {
    $('.input-box input, .copy-icon').click(function() {
      var inputElement = $('#contract');
      inputElement.select();
      document.execCommand('copy');
      
      var inputBox = $('.input-box');
      inputBox.addClass('copied');

      setTimeout(function() {
        inputBox.removeClass('copied');
      }, 1000);
    });
}

function action_faq() {
    $('.block-faq .faq-box .faq-item').click(function () {
        $('.block-faq .faq-box .faq-item').not($(this)).removeClass('opened');
        $(this).toggleClass('opened');
    });
}

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

$(document).ready(function() {
    
    if (CSS.supports('mix-blend-mode', 'color')) {
        if (!isMobileDevice()) {
            if ($(window).width() < 1240) {
                animateInfinity($('.block-intro .phantoms .phantom.ph1'), 20000, { bottomMin: -10, bottomMax: 50, leftMin: -30, leftMax: 10 });
                animateInfinity($('.block-intro .phantoms .phantom.ph2'), 15000, { bottomMin: 45, bottomMax: 75, leftMin: 55, leftMax: 75 });
                animateInfinity($('.block-intro .phantoms .phantom.ph3'), 10000, { bottomMin: -5, bottomMax: 15, leftMin: 75, leftMax: 85 }, 'right');
            } else {
                animateInfinity($('.block-intro .phantoms .phantom.ph1'), 25000, { bottomMin: -5, bottomMax: 20, leftMin: -5, leftMax: 5 });
                animateInfinity($('.block-intro .phantoms .phantom.ph2'), 25000, { bottomMin: 35, bottomMax: 60, leftMin: 60, leftMax: 70 });
                animateInfinity($('.block-intro .phantoms .phantom.ph3'), 15000, { bottomMin: -10, bottomMax: 5, leftMin: 70, leftMax: 80 }, 'right');
            }

            // TEXT + BOO + COLOR
            animateInfinity($('.block-intro .phantoms .phantom.buy'), 50000, { bottomMin: 60, bottomMax: 70, leftMin: 14, leftMax: 20 });
            animateInfinity($('.block-intro .intro-color'), 15000, { bottomMin: -25, bottomMax: 0, leftMin: -25, leftMax: 0 }, 'right');
            randomlyActivateElement('.block-intro .phantoms .phantom.boo', 'active', 3000, 5000);
        }
    } else {
        $('.block-intro').addClass('static');
    }

    
    playBackgroundMusic('sound/boo.mp3', 1);
    
    action_menu();
    
    action_play();
    
    action_copy();
    
    action_faq();
    
    $('#buyButtonOpener').click(function(){
        $('#buyButton').toggleClass('active');
        $('#buyButtonOpener').toggleClass('pinkdark');
    });
});
