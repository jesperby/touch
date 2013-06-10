define(['jquery', 'backbone', 'chrome', 'apps/events/js/EventListCollection.js', 'text!apps/events/templates/events-tpl.html', 'ga'], function ($, Backbone, Chrome, EventListCollection, Templates, GA) {
  'use strict';
  Templates = $('<div>').html(Templates);

  var events = {};
  
  
  var View = Backbone.View.extend({
    el: $('body'),
    collection:null,
    events: {},
    initialize: function(info) {
      this.catid = info.cid;
      // Set up the listener here for the sake of the category id. 
      this.events['click #more-results-'+this.catid] = 'showMoreResults';
      this.collection = new EventListCollection;
      // this.collection.fetch({data:{searchCategory:this.catid}});  
      if(!this.collection.loaded) {
        var that = this;
        this.collection.fetch({data:{searchCategory:this.catid}}).success(function(){
          that.render();
        });
      } else {
        this.render();
      }
      
      // _.bindAll(this, 'render');
      // this.collection.on('reset', this.render);
    },
    catid:null,
    template: _.template(Templates.find('#eventListTemplate').html()),
    render: function() {
      var html = this.template({events: this.collection.toJSON(), catid:this.catid});
      var $html = Chrome.parseHTML(html) 
      if(this.collection.page==1) {
        Chrome.showPage($html);
      } else {
        var $newlist = $html.find('#eventlist li');
        $('#eventlist').append($newlist).listview('refresh');
        GA.pageView('More '+'?search=&searchCategory='+this.catid+" "+this.collection.page );
      }
      if(!this.collection.moreResultsAvailable) {
        $('#more-results-'+this.catid).remove();
      }
      $.mobile.loading('hide');
    },

    showMoreResults: function() {
      $.mobile.loading('show');
      this.collection.page++;
      // this.collection.fetch({data:{searchCategory:this.catid}});  
      var that = this;
      this.collection.fetch({data:{searchCategory:this.catid}}).success(function(){
        that.render();
      });
      
      return false;
    }
  });
  
  return View;
});
