/**
 * Multiple (2010-Present)
 * Damon Zucconi
 * CC BY-SA 3.0
 **/

(function () {
  'use strict';

  var Multiple = {
    models: {
      occurrence: function (params) {
        this.year    = params.year    || "1900";
        this.month   = params.month   || "January";
        this.day     = params.day     || "01";
        this.hour    = params.hour    || "00";
        this.minute  = params.minute  || "00";
        this.second  = params.second  || "00";
        this.format  = params.format  || "YOWDHMS";
        this.bgcolor = params.bgcolor || "#FFFFFF";
        this.color   = params.color   || "#000000";
      }
    },

    helpers: {
      status: function (target) {
        return new Date() > target;
      },

      getParams: function () {
        var i,
          hash,
          vars = {},
          hashes = window.location.href.slice(window.location.href.indexOf('?') + 1)
                                         .split('&');

        for (i = hashes.length - 1; i >= 0; i--) {
          hash = hashes[i].split('=');
          vars[hash[0]] = hash[1];
        }

        return vars;
      }
    },

    initialize: function () {
      var target = new Multiple.models.occurrence(Multiple.helpers.getParams()),
          $el = $('body'),
          $count = $('#count'),
          _event = new Date(
              target.month   + 
              target.day     + "," + 
              target.year    + " " + 
              target.hour    + ":" + 
              target.minute  + ":" + 
              target.second
            );

      $el.css('backgroundColor', target.bgcolor);

      if (Multiple.helpers.status(_event)) {
        $count.
          countdown('destroy').
          css('color', target.color).
          countdown({
              compact: true,
              since: _event,
              format: target.format
            });
      } else {
        $count.
          countdown('destroy').
          css('color', target.color).
          countdown({
              until: _event,
              compact: true,
              format: target.format,
              onExpiry: Multiple.initialize
            });
      }
    }
  };

  $(function () { Multiple.initialize(); });

}());