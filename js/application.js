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
      setOptions: function (target, options) {
        if (new Date() > target) { return options.since; }
        return options.until;
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
      var _options,
          options,
          target = new Multiple.models.occurrence(Multiple.helpers.getParams()),
          $count = $('#count'),
          _event = new Date(
              target.month   + 
              target.day     + "," + 
              target.year    + " " + 
              target.hour    + ":" + 
              target.minute  + ":" + 
              target.second
            );

      _options = {
        since: {
          compact: true,
          since: _event,
          format: target.format
        },

        until: {
          compact: true,
          until: _event,
          format: target.format,
          onExpiry: Multiple.initialize 
        }
      };

      options = Multiple.helpers.setOptions(_event, _options);

      $count.
        css('color', target.color).
        countdown('destroy').
        countdown(options).
        fitText(1.5);

      $('body').css('backgroundColor', target.bgcolor);
    }
  };

  $(function () { Multiple.initialize(); });
}());
