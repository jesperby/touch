define(['jquery', 'chrome', 'backbone', 'text!apps/intnews/templates/intnews-tpl.html', 'jqm'], function ($, Chrome, Backbone, Templates) {
  'use strict';
  
  // Page templates for this app
  Templates = $('<div>').html(Templates);        
  
  // Path to this module
  var modulepath = null;
  
  // Entry point of the app
  function init(p) {
    modulepath = p;
    Chrome.loadCss([modulepath+'/css/intnews.css']);
  }
  
  // Handle route request, show article list
  function showArticleList() {
    $.mobile.loading('show');
    require(['apps/intnews/js/NewsListView'], function (NewsListView) {
      new NewsListView();
    });
  }

  // Handle route request, show single article
  function showArticle(aid){
    $.mobile.loading('show');
    require(['apps/intnews/js/NewsArticleView'], function (NewsArticleView) {
      new NewsArticleView({"aid":aid});
    });
  }
  
  // Define routes for Backbone
  var router = {
    routes: {
      'komin-news/article/:aid'   : 'showArticle',
      'komin-news'                : 'showArticleList'      
    },
    showArticleList: showArticleList,    
    showArticle: showArticle
  }
  
  return {
    router:router,
    init:init
  };
});
