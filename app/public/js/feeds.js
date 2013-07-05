/*!
 * $Rev: 2406 $
 * $Date: 2010-12-21 15:19:35 +0100 (Tue, 21 Dec 2010) $
 * $URL: http://svn.dev.malmo.se/svn-e-tjanster/web-apps/touch/branches/touch_1_0/app/public/js/feeds.js $
 */

/**
 * Get and inject news feeds
 */

jQuery(document).ready(function($) {

    $(function() {

        var currentFeedName;
        var currentFeed;
        var lastTocOffset = 0;

        /**
         * Triggered when the #news and #vacancies panels are displayed
         */
        $("#news, #vacancies").bind('pageAnimationStart', function(e, info) {

            var $panel = $(this);

            if (info.direction == 'in') {

                currentFeedName = $panel.data('referrer').attr('data-feed');

                var feedUrl = touchConfig.feeds.uri;
                if ($panel.data('referrer').attr('data-feed-base')) {
                    feedUrl = $panel.data('referrer').attr('data-feed-base');
                }

                createTracker('ToC ' + currentFeedName);

                if (!$panel.data(currentFeedName)) {
                    startLoading($panel);
                    $.ajax({
                        url: feedUrl,
                        data: ({'feed': currentFeedName}),
                        dataType: "jsonp",
                        success: function(results){

                            buildToC($panel, results);

                            endLoading($panel);
                            $panel.data(currentFeedName, results);
                        }
                     }
                  )
                }
                else {
                    buildToC($panel, $panel.data(currentFeedName));
                }
            }
            else {
                $('nav.toc').remove();
                currentFeed = $panel.data(currentFeedName);
            }
        });

        $("#news, #vacancies").bind('pageAnimationEnd', function(e, info) {
            if (info.direction == 'in' && lastTocOffset > 0) {
                setTimeout(function() {
                    $('html, body').animate({scrollTop: lastTocOffset}, 200);
                    lastTocOffset = 0;
                }, 0);
            }
        });

        function buildToC($panel, content) {
            currentFeed  = content;
            var panelHash = '#' + $panel.attr('id');

            $panel.not('nav.toc').find('.toolbar').after('<nav class="toc"><ul>');

            $(content.items).each(function(index, item) {
                $li = $('<li class="arrow"><a class="slide"><p></p><h2></h2></a></li>').appendTo(panelHash + ' ul');
                $li.find("a").attr('data-id', item.id).attr('href', panelHash + '-details');
                $li.find("h2").text(item.title);
                $li.find("p").text(item.pubDate);
            });

            // Reset lastTocOffset. 'live' doesn't work with tap, bind events.
            $('nav.toc ul *').bind('tap click', function() {
                lastTocOffset = $(this).offset().top;
            });
        }

        /**
         * Triggered when news and vacancies details panels are displayed
         */
        $("#news-details, #vacancies-details").bind('pageAnimationStart', function(e, info) {

            if (info.direction == 'in') {
                $panel = $(this);
                var referrer = $(this).data('referrer');
                var newsId = referrer.attr('data-id');
                var item = false;

                $(currentFeed.items).each(function(i, val) {

                    if (val.id == newsId) {
                        item = val;

                        var $details = $panel.find('article').append('<h2></h2><p class="date"></p><div class="desc"></div>');
                        $details.find('h2').text(item.title);

                        $details.find('p.date').text(item.pubDate);
                        $details.find('div.desc').html(item.description);

                        if (item.enclosure) {
                            $details.find('div.desc').prepend($('<img>').attr('src', item.enclosure.url));
                        }

                        // Full article from SV
                        if (item.content) {
                            $details.append('<div class="content"><p>' + item.content + '</p></div>');
                        }

                        if (item.readMore) {
                            $details.append('<div class="read-more"><a rel="external"></a></div>');
                            $details.find('div.read-more a').text(item.readMore).attr('href', item.link);
                        }

                        $('<a class="mail"></a>').prependTo('footer nav div.end', $panel);
                        var mailSubject, mailBody;
                        if (currentFeedName == 'vacancies') {
                            mailSubject =  'Ett jobbtips';
                            mailBody = "Hej!" + linefeed + linefeed + "Jag vill tipsa dig om ett ledigt jobb i Malmö stad.";
                        } else {
                            mailSubject =  'Ett nyhetstips';
                            mailBody = "Hej!" + linefeed + linefeed + "Jag vill tipsa dig om en nyhet från Malmö stad:";
                        }

                        $('footer nav a.mail').attr('href','mailto:?subject=' + mailSubject + '&body=' + mailBody + linefeed + linefeed  + item.link);
                        createTracker(item.link);
                        return false;
                    }
                });

            }
            else {
                $panel.find('article').empty();
                $('footer nav a.mail').remove();
            }
        });

    });

});
