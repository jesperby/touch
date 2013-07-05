/*!
 * $Rev: 2406 $
 * $Date: 2010-12-21 15:19:35 +0100 (Tue, 21 Dec 2010) $
 * $URL: http://svn.dev.malmo.se/svn-e-tjanster/web-apps/touch/branches/touch_1_0/app/public/js/events.js $
 */

/**
 * Events calendar
 */

jQuery(document).ready(function($) {

    $(function() {

        // Hijack search form if keyboard search key is touched
        $("#events-search-form").submit(function(event) {
            $("#events-search-text").blur();
            return false;
        });

        /**
         * Triggered when #events is displayed
         */
        $("#events").bind('pageAnimationStart', function(e, info) {

            var $panel = $(this);
            if (info.direction == 'in') {

                createTracker('EventsToC');

                if (!$panel.data('loaded')) {
                    startLoading($panel);
                    $.ajax({
                        url: touchConfig.events.uri + 'EventGuide',
                        success: function(data) {
                            $panel.find('header').after(data);
                            $panel.data('loaded', true);
                        },
                        error: function(xhr, msg, errorThrown) {
                            $panel.find('header').after('<p>Kunde inte hämta informationen.</p>');
                        },
                        complete: function() {
                            endLoading($panel);
                        }
                    });
                }
            }
        });

        /**
         * Triggered when #events-search-results is displayed
         * Place search results data in "#events-search-results .results" from an ajax get or from panel if it's loaded
         */
        $("#events-search-results").bind('pageAnimationStart', function(e, info) {
            var $panel = $(this);

            if (info.direction == 'in') {

                var referrer = $panel.data('referrer');
                var searchUrl;
                var headingText;

                // Search form
                if (referrer.attr('data-search-type') == 'form') {
                    searchUrl = touchConfig.events.searchBase + '?' + $("#events-search-form").serialize();
                    headingText = 'Sökresultat';
                    createTracker('SearchForm ' + searchUrl);
                }

                // Nearby geo form
                else if (referrer.attr('data-search-type') == 'nearby') {
                    $panel.find("nav").html('<a class="back">Position</a>');
                    headingText = 'I närheten';
                    searchUrl = touchConfig.events.searchBase + '?' + $("#events-nearby-form").serialize();
                    createTracker('NearbyResults ' + searchUrl);
                }

                // Category selection
                else {
                    searchUrl = referrer.attr('data-proxy-url');
                    headingText = referrer.text();
                    createTracker('Category ' + searchUrl);
                }

                // Execute search request only if the last search was not the same as this one
                if ($panel.data('last-search') != searchUrl) {
                    startLoading($panel);
                    $panel.find('ul').remove();
                    $panel.find('h1').text(headingText);
                    $panel.data('last-search', searchUrl);
                    getSearchResults($panel, searchUrl, "");
                }
                // If search is same as last one, we just show the panel again
                else {
                    endLoading($panel);
                    $panel.find('ul').show();
                }
            }
            // Cleanup when the panel is moving out
            else {
                $panel.find('ul').hide();
            }
        });

        // Get more results, the panel is already loaded
        $("#events-more-results").tap(function(e) {
            $link = $(this);
            $link.addClass('loading');
            getSearchResults($link, $link.attr('data-proxy-url'), 'Page/' + $link.attr('data-proxy-next') + '/');
            createTracker('More ' + $link.attr('data-proxy-url') + ' ' + $link.attr('data-proxy-next'));
        });

        /**
         * Get search results data, check if we have the data before execute an ajax request
         * Keep the results if we execute a new search
         */
        function getSearchResults($panel, proxyUrl, page) {

            var search = page ? touchConfig.events.searchBase + page + proxyUrl : proxyUrl;

            // Get fresh content?
            if (!$panel.data('loaded-' + search)) {

                // Make ajax request
                $.get(search, function(results) {

                    // Keep the results
                    $panel.data('loaded-' + search, true);
                    $panel.data(search, results);
                    injectSearchResults($panel, results, proxyUrl);
                });
            }
            // Else place data in element
            else {
                injectSearchResults($panel, $panel.data(search), proxyUrl);
            }
        }

        /**
         * Place search results data in panel, either as a new list or at the botton of an existing list (More...)
         */
        function injectSearchResults($panel, results, proxyUrl) {

            // Inser after toolbar if the current page has no More... link
            if ($("#events-more-results").length == 0) {
                $panel.find('.toolbar').after(results);
            }
            // Replace the More... link with the results
            else {
                $("#events-more-results").replaceWith($('li', results));
            }

            // Show the reusults
            endLoading($panel);
            $panel.find('ul').show();

            // live doesn't work with tap, bind events and reset $lastTocItem
            $lastTocItem = false;
            $('#events-search-results ul *').bind('tap', function() {
                $lastTocItem = $(this);
            });

            // Add search url to the More... trigger if it exists
            $("#events-more-results").attr('data-proxy-url', proxyUrl.replace(touchConfig.events.searchBase.slice(0,-1),""));

        }


        /**
         * Set lat/long for #events-nearby form
         */
        $("#events-nearby").bind('pageAnimationStart', function(e, info) {
            if (info.direction == 'in') {
                $("#events-nearby-position").addClass('loading').text('Söker position...');
                getLocation();
                createTracker('NearbyForm');
            }
        });

        function getLocation() {
            // No search before we get geoloc
            $("#events-nearby-button").hide();

            // W3C
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setLocation, showError);
            // Google Gears (for older Androids)
            } else if (typeof(google) != "undefined" && typeof(google.gears) != "undefined") {
                var geo = google.gears.factory.create('beta.geolocation');
                geo.getCurrentPosition(function(position) {
                    position.coords = position;
                    setLocation(position);
                });
            }
            else {
                showError();
            }
        };

        function setLocation(position) {
            var pos = position.coords.latitude + "," + position.coords.longitude;
            $("#events-nearby-position").removeClass('loading').text(pos);
            $("#events-nearby-near").attr("value", pos);
            $("#events-nearby-button").show();
        }

        function showError() {
            $("#events-nearby-position").removeClass('loading').text("Kunde inte bestämma positionen");
        }


        /**
         * Get and display event or arena details
         */
        /**
         * Triggered when panel is displayed
         */
        $("#events-details, #events-arena").bind('pageAnimationStart', function(e, info) {

            var $panel = $(this);

            // If panel is moving in
            if (info.direction == 'in') {
                var referrer = $panel.data('referrer');
                var url = referrer.attr('data-proxy-url');

                createTracker(url);

                // Execute data request only if the last search was not the same as this one
                if($(this).data('last-search') != url) {
                    startLoading($panel);
                    getDetails($panel, url);
                }

            }
            // Cleanup when the panel is moving out
            else {
                $panel.find('article').empty().hide();
                $('footer nav a.mail').remove();
            }
        });

        /**
         * Get data, check if we have data before executing an ajax request
         * Keep the results if we execute a new request
         */
        function getDetails($panel, proxyUrl) {

            // Get fresh content?
            if (!$panel.data('loaded-' + proxyUrl)) {

                // Make ajax request
                $.get(proxyUrl, function(results) {
                    // Keep the results
                    $panel.data('loaded-' + proxyUrl, true);

                    $panel.data(proxyUrl, results);
                    injectDetails($panel, results, proxyUrl);
                });
            }
            // Else place data in element
            else {
                injectDetails($panel, $panel.data(proxyUrl), proxyUrl);
            }
        }

        /**
         * Place details in panel
         */
        function injectDetails($panel, results, proxyUrl) {
            $panel.find('article').append(results).show();
            endLoading($panel);
            $(".sections a, .main-attribs a").attr('rel', 'external');

            $('<a class="mail"></a>').prependTo('footer nav div.end', $panel);
            var mailSubject =  'Ett evenemangstips';
            var mailBody = "Hej!" + linefeed + linefeed + "Jag vill tipsa dig om ett evenemang i Malmö.";
            var fullUrl = document.location.protocol + '//' + document.domain + proxyUrl;
            $('footer nav a.mail').attr('href','mailto:?subject=' + mailSubject + '&body=' + mailBody + linefeed + linefeed + fullUrl);

        }

        /**
         * Search for events
         */
        /**
         * Triggered when #events-search is displayed
         */
        $("#events-search").bind('pageAnimationStart', function(e, info) {

            if (info.direction == 'in') {
                startLoading($(this));
                getSearchForm($(this));
                createTracker('SearchForm');
            }
        });

        // Hijack search form if keyboard search key is touched
        $("#search-form").submit(function(event) {
            $("#search-text").blur();
            return false;
        });

        function getSearchForm($panel) {

            // Get form if not loaded
            if (!$panel.data('loaded-form')) {
                // Get search form and keep it
                $.get(touchConfig.events.uri + 'search_form', function(form) {

                    // Generate dates and insert them in date selectors
                    var dates = createDates();
                    var options;
                    $.each(dates, function(key, value) {
                        options += '<option>' + value + '</option>';
                    });

                    // Keep the results
                    $panel.data('loaded-form', true);
                    $panel.data('form', form);
                    $panel.data('dates', options);
                    injectSearchForm(form, options);

                });
            }
            else {
                // Use existing form panel
                endLoading("#events-search");
            }
        }

        function injectSearchForm(form,dates) {
            endLoading("#events-search");
            $("#events-search header.toolbar").after(form);
            $("#events-from-date, #events-to-date").html(dates);
            $("#events-to-date").prepend('<option value="">Och framåt</option>');
            $("#events-to-date option:first").attr('selected','selected');

            // Hack, Android 1.6 doesn't handle placeholder attributes
            if (navigator.userAgent.indexOf("Android 1") != -1) {
                $("#events-search-text").removeAttr('placeholder');
            }
        }

        /*
         * Calendar for search form
         */
        function createDates() {
            pad = function(n){ return n<10 ? '0'+n : n; };
            var ts = (new Date()).getTime()-Date.UTC(1970,0,1);
            var dates = [];
            for (var i=0; i<90; i++) {
                var d = new Date(ts + (i*60*60*24*1000));
                dates.push(d.getFullYear() +'-'+ pad(d.getMonth()+1) +'-'+ pad(d.getDate()));
            }
            return dates;
        }

    });

});
