define(['jquery', 'backbone', 'chrome', 'apps/events/js/State', 'apps/events/js/EventListCollection.js', 'text!apps/events/templates/events-tpl.html'], function ($, Backbone, Chrome, State, EventListCollection, Templates) {
  'use strict';
  Templates = $('<div>').html(Templates);
  var rendered;
  
  var View = Backbone.View.extend({
    el: $('body'),
    initialize: function(searchform) {
      _.bindAll(this);
      var $sform = $('div').html(searchform.data);
      this.populateDateFields($sform);
      this.render($sform.html());
    },
    
    populateDateFields: function($sform) {
      var dates = this.createDateRange();
      $sform.find('#events-from-date').html(dates.join(''));
      dates.shift();
      $sform.find('#events-to-date').html(dates.join(''));      
      $sform.find('#events-to-date').prepend('<option value="">Och framåt</option>');
    },
    
    createDateRange: function() {
      var pad = function(n){ return n<10 ? '0'+n : n; };
      var ts = (new Date()).getTime()-Date.UTC(1970,0,1);
      var dates = [];
      for (var i=0; i<90; i++) {
        var d = new Date(ts + (i*60*60*24*1000));
        dates.push('<option>'+d.getFullYear() +'-'+ pad(d.getMonth()+1) +'-'+ pad(d.getDate())+'</option>');
      }
      return dates;
    },
    
    template: _.template(Templates.find('#searchTemplate').html()),

    render: function(form) {
      var $rendered;
      if(!rendered) {
        rendered = this.template({searchform:form});
        $rendered = Chrome.parseHTML(rendered);
      } else {
        $rendered = Chrome.parseHTML(rendered);
        this.restoreSearchParams($rendered);
      }
      Chrome.showPage($rendered);      
    },
    
    restoreSearchParams: function($wrap) {
      $wrap.find('input#search-text').val(State.searchParams.search);
      $wrap.find('select#search-categories').val(State.searchParams.searchCategory);
      $wrap.find('select#events-search-arenas').val(State.searchParams.arena);
      $wrap.find('select#events-from-date').val(State.searchParams.fromDate);
      $wrap.find('select#events-to-date').val(State.searchParams.toDate);
    },
    
    events: {
      'click #event-search-btn': 'handleSearchRequest'
    },

    handleSearchRequest: function() {
      // #events/search-results/searchword/cat/loc/from/to
      var $frm = $('#event-search-form');
      var url = [
        '#events',
        'search-results',
        $frm.find('#search-text').val(),
        $frm.find('#search-categories').val(),
        $frm.find('#events-search-arenas').val(),
        $frm.find('#events-from-date').val(),
        $frm.find('#events-to-date').val()
      ];
      window.location.hash = url.join('/');
      return false;
    }

  });
  

  return View;
});