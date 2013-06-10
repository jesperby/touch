define(['jquery', 'underscore', 'backbone', 'jqm'],function($, _, Backbone) {
  // Convenience methods for dealing with the jqm and DOM
  'use strict';
  
  // Make on the fly changes to jqm pages
  function enhanceView($view) {
    var $header = $view.find('div[data-role="header"]');
    var $footer = $view.find('div[data-role="footer"]');

    $header.attr({'data-position':'fixed', 'data-tap-toggle':'false'});
    $footer.attr({'data-position':'fixed', 'data-tap-toggle':'false'});

    if( window.location.hash == '#news' || window.location.hash == '#events' ||
        window.location.hash == '#jobs' || window.location.hash == '#komin-news' ) {
      $header.prepend($('<a href="#home" class="ui-btn-left" data-icon="arrow-l" data-transition="slide" data-direction="reverse">Hem</a>'));
    }

    if( window.location.hash != '#home' && window.location.hash.substring(0, 8) != '#poi/map' &&
        window.location.hash != '#report' && window.location.hash.substring(0, 20) != '#poi/info/directions' &&
        window.location.hash.substring(0, 14) != '#events/search' ) {
      $header.append($('<a href="#home" class="ui-btn-right" data-icon="home" data-transition="slide" data-direction="reverse" data-iconpos="notext">Hem</a>'));
    }
  }
  
  // Used to display rendered page
  function showPage($view, opt) {
    if( $view.length == 3 ) {
      $view.splice( 0, 1);
      $view.splice( 1, 1);
    }
    $view = $($view);

    enhanceView($view);
    var opt = $.extend({
      reloadPage: false,
      changeHash: false,
      allowSamePageTransition: false,
      showLoadMsg: true
    }, (opt || {}));

    $('body').append($view);
    $.mobile.changePage($view, opt);
    $.mobile.loading('hide');
  }
  
  // Dynamic loading of app-specific stylesheets
  function loadCss(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  /**
   * Function that convers html into a corresponding jquery object
   */
  function parseHTML( html ) {
    // $.parseHTML returns array of dom objects. May contain empty/broken objects.
    var parsed_html = $.parseHTML(html);

    // remove empty/broken dom objects
    var dom_array = new Array();
    for (var key in parsed_html) {
      if( parsed_html[key].localName != null ) {
        dom_array.push( parsed_html[key] );
      }
    }

    // Convert dom object array into jquery object
    var $page = $(dom_array);
    
    return $page;
  }

  return{
    showPage:showPage,
    loadCss:loadCss,
    parseHTML:parseHTML
  }
});

