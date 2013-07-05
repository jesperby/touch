/*!
 * $Rev: 2406 $
 * $Date: 2010-12-21 15:19:35 +0100 (Tue, 21 Dec 2010) $
 * $URL: http://svn.dev.malmo.se/svn-e-tjanster/web-apps/touch/branches/touch_1_0/app/public/js/global.js $
 */

/**
 * Init functions and settings and global functions
 */
var app = 'app/';
var jQT = new $.jQTouch({
    slideSelector: '#jqt > * > ul li a, .slide',
    icon: app + 'public/img/icon.png',
    addGlossToIcon: false,
    startupScreen: app + 'public/img/startup.png',
    statusBar: 'default',
    preloadImages: [
        app + 'public/img/backButton.png',
        app + 'public/img/cancel.png',
        app + 'public/img/chevron.png',
        app + 'public/img/home.png',
        app + 'public/img/icon.png',
        app + 'public/img/icon-small.png',
        app + 'public/img/info.png',
        app + 'public/img/info-highlight.png',
        app + 'public/img/listGroup.png',
        app + 'public/img/loading.gif',
        app + 'public/img/loading-black.gif',
        app + 'public/img/mail.png',
        app + 'public/img/mail-highlight.png',
        app + 'public/img/on_off.png',
        app + 'public/img/search.png',
        app + 'public/img/settings.png',
        app + 'public/img/toggle.png',
        app + 'public/img/toggleOn.png',
        app + 'public/img/tip-arrow.png',
        app + 'public/img/toolButton.png'
    ]
});

var UAAccount = 'UA-331614-1';
//var UAAccount = 'UA-19475063-1'; // test account
var _gaq = _gaq || [];
_gaq.push(['_setAccount', UAAccount]);
_gaq.push(['_setDomainName', '.malmo.se']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function createTracker(id) {
    // Delay so the document.location.href is updated
    setTimeout(function() {
        var path =  document.location.href.replace(document.location.protocol + '//' + document.domain, '');
//        console.log('GA: ' + path + ' ' + id);
        _gaq.push(['_trackPageview', path + ' ' + id]);
    }, 500);
}


/**
 *  Add ajax loader
 */
function startLoading($panel) {
    $panel.find('.toolbar').after('<div class="loading-panel"></div>');
}
/**
 *  Remove ajax loader
 */
function endLoading($panel) {
    $(".loading-panel").remove();
}

var $lastTocItem = false;

// UA detection needed for line feeds in emails, poor Android support
var linefeed = (navigator.userAgent.indexOf("Android") != -1) ? " " : "%0A";

jQuery(document).ready(function($) {

    $(function() {
        /**
         * Custom animation
         * slidedown-search is defined in CSS
         */
        jQT.addAnimation({
            name: 'slidedown-search',
            selector: '.slidedown-search'
        });

        // GA logging of #home panel
        $("#home").bind('pageAnimationEnd', function(e, info) {
            if (info.direction == 'in') {
                createTracker('');
            }
        });

        // Display tip box for iPhone
        if (navigator.userAgent.indexOf("iPhone") != -1) {

            // Hide menu bar if visible
            addEventListener('load', function() {
                setTimeout(function() {window.scrollTo(0, 1);});
            }, false);

            $('<div id="iphone-tip"><p>Installera appen genom att lägga till den på din hemskärm</p><div class="arrow"></div></div>')
                .insertAfter("body:not(.fullscreen) #home header")
                .delay(1000)
                .animate({
                    top: [window.innerHeight - $('#iphone-tip').height(), 'easeOutBounce']
                }, 2500)
                .click(function() {
                    $(this).fadeOut(400);
            });
        }

        // Hack, icons in footer need to have certain distance to the viewports bottom and Android 2.1 to be tap-able
        if (navigator.userAgent.indexOf("Android 2.1") != -1) {
            $("#home footer").css('padding-bottom', '25px');
        }

        // Clone footer from home panel to others
        $("#home footer").clone().appendTo("section:not([id=home]):not([id=settings]):not([id=search])");
        $("section:not([id=settings]):not([id=search])").css("padding-bottom", parseInt(($("footer").height() + 10) + 'px'));

        // Settings (info) panel
        $("#settings").bind('pageAnimationStart', function(e, info) {
            if (info.direction == 'in') {
                createTracker('');
            }
        });

        // Prevent home-button on #home panel
        $('footer nav a.home').click(function(event) {
            if (document.location.hash == '#home') {
                return false;
            }
        });

        // Scroll to last tapped list item in panels ToC
        $("#news, #vacancies, #events-search-results").bind('pageAnimationEnd', function(e, info) {
            if (info.direction == 'in' && $lastTocItem) {
                setTimeout(function() {
                    $('body, html').scrollTop($lastTocItem.offset().top);
                }, 0);
            }
        });

    });
});
