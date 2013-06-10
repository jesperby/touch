define(['jquery', 'backbone', 'apps/events/js/EventListView.js', 'apps/events/js/EventListCollection.js'], function ($, Backbone, EventListView, EventListCollection) {
  'use strict';
  
  var View = EventListView.extend({
    collection:null,
    searchParams: {},
    initialize: function(info) {
      this.catid = 'search';
      this.searchParams = info.sparams;
      // Set up the listener here for the sake of the category id. 
      this.events['click #more-results-'+this.catid] = 'showMoreResults';
      
      this.collection = new EventListCollection;
      this.collection.fetch({data:this.searchParams});  
      _.bindAll(this, 'render');
      this.collection.on('reset', this.render);
    },
    
    showMoreResults: function() {
      $.mobile.loading('show');
      this.collection.page++;
      this.collection.fetch({data:this.searchParams});  
      return false;
    }
    
  });
  
  return View;
});