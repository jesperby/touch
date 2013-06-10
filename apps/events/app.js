define(['jquery', 'chrome', 'backbone', 'apps/events/js/State', 'locator', 'text!apps/events/templates/events-tpl.html', 'ga', 'jqm'], function ($, Chrome, Backbone, State, Locator, Templates, GA) {
  'use strict';

  Templates = $('<div>').html(Templates);        
  var modulepath = null;
  var searchRadius = 5000;
  var searchForm;
  var categoryId;

  function init(p) {
    modulepath = p;
    Chrome.loadCss([modulepath+'/css/events.css']);
  }
  
  function showEventCategoryList() {
    $.mobile.loading('show');
    GA.pageView('EventsToC');    
    require(['apps/events/js/EventCategoryListView'], function (EventCategoryListView) {
      new EventCategoryListView();
    });
  }
  
  function showEventList(cid) {
    $.mobile.loading('show');
    GA.pageView('Category '+window.location.hash);  
    require(['apps/events/js/EventListView'], function (EventListView) {
      new EventListView({"cid":cid});
    });
  }
  
  function showEvent(catid, catlabel, eid) {
    $.mobile.loading('show');
    GA.pageView(window.location.hash);  
    require(['apps/events/js/EventView'], function (EventView) {
      new EventView({"catid":catid, "catlabel":catlabel, "eid":eid});
    });
  }
  
  function showEventSearch() {
    $.mobile.loading('show');
    GA.pageView('SearchForm');  
    require(['apps/events/js/EventSearchView'], function (EventSearchView) {
      if(!searchForm) {
        $.ajax({
          url: 'http://webapps2.malmo.se/evenemang/search_form',
          success: function(data) {
            searchForm = new EventSearchView({"data":data});
          }
        });
      } else {
        searchForm.render();
      }
    });
  }
  
  function showEventSearchResults(params) {
    $.mobile.loading('show');    
    params = params || '';
    var args = params.split('/');
    if(args.length != 5) {
      window.location.hash = '#events/search';
      return;
    }

    State.searchParams = {
      search          : args.shift(),
      searchCategory  : args.shift(),
      arena           : args.shift(),
      fromDate        : args.shift(),
      toDate          : args.shift()
    };

    GA.pageView('SearchForm ' + window.location.hash);    
    require(['apps/events/js/EventSearchResultsView'], function (EventSearchResultsView) {
      new EventSearchResultsView({"sparams":State.searchParams});
    });    
  }
  
  
  function showEventsNearby() {
    $.mobile.loading('show');

    Locator.location(function(pos, success){
      if(success) {
        GA.pageView('NearbyResults ' + window.location.hash);    
        require(['apps/events/js/EventSearchResultsView'], function (EventSearchResultsView) {
          new EventSearchResultsView({
            within: searchRadius,
            near: pos.lat + ',' + pos.lng
          });
        });
      }
    });
  }
  
  var router = {
    routes: {
      'events'                              : 'showEventCategoryList',
      'events/category/:cid'                : 'showEventList',
      'events/event/:catid/:catlabel/:eid'   : 'showEvent',
      'events/search'                       : 'showEventSearch',
      // #events/search-results/searchword/cat/loc/from/to
      'events/search-results/*params'       : 'showEventSearchResults',
      'events/search-results'               : 'showEventSearchResults',
      'events/nearby'                       : 'showEventsNearby'
    },
    
    showEventCategoryList   : showEventCategoryList,
    showEventList           : showEventList,
    showEvent               : showEvent,
    showEventSearch         : showEventSearch,
    showEventSearchResults  : showEventSearchResults,
    showEventsNearby        : showEventsNearby
  }
  
  return {
    router:router,
    init:init
  };

});
