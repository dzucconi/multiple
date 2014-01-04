_.mixin({
  getParams: function() {
    var href = window.location.href;
    return href.slice(href.indexOf('?') + 1).split('&').reduce(function(obj, pair) {
      var kv = pair.split('=');
      obj[kv[0]] = decodeURIComponent(kv[1]);
      return obj;
    }, {});
  },

  toDate: function(options) {
    return new Date(
      options.month +
      options.day + ',' +
      options.year + ' ' +
      options.hour + ':' +
      options.minute + ':' +
      options.second
    );
  }
});

(function(exports) {
  'use strict';

  var Countdown, App, Renderer;

  Countdown = function(el, date, formatString) {
    var self, renderer;

    self = this;
    renderer = new Renderer(formatString || 'yowdhms');

    self.$el = $(el);
    self.timerId = countdown(date, function(ts) {
      self.$el.html(renderer.html(ts)); // Update HTML
    }, renderer.units); };

  Renderer = function(formatString) {
    var periods, parse, parsed, units, pad, wrap, html;

    var map = {
      y: 'YEARS',
      o: 'MONTHS',
      w: 'WEEKS',
      d: 'DAYS',
      h: 'HOURS',
      m: 'MINUTES',
      s: 'SECONDS'
    };

    // Take string and turn it into a units integer
    // for consumption by countdown using bitwise OR
    parse = function(formatString) {
      return _.reduce(formatString.split(''), function(memo, unit) {
        return countdown[map[unit]] | memo;
      }, null);
    };

    pad = function(n) {
      return ((n.toString().length === 1) && (n < 10)) ? ('0' + n) : n.toString();
    };

    wrap = function(unit) {
      return '<span class="countdown-' + unit + '"><%= ' + unit + ' %></span>';
    };

    periods = {
      y: (wrap('years') + 'y '),
      o: (wrap('months') + 'm '),
      w: (wrap('weeks') + 'w '),
      d: (wrap('days') + 'd '),
      h: (wrap('hours')),
      m: (wrap('minutes')),
      s: (wrap('seconds'))
    };

    var separator = '<span class="blink">:</span>';

    html = function(ts) {
      var fragments, fragment;

      // Pad relevant numbers
      _.each(['hours', 'minutes', 'seconds'], function(period) {
        if (_.has(ts, period)) ts[period] = pad(ts[period]);
      });

      // Generate HTML
      fragments = _.reduce(formatString.split(''), function(memo, unit) {
        memo[unit] = periods[unit];
        return memo;
      }, {});

      // Join fragments
      fragment =
        _.values(_.omit(fragments, 'h', 'm', 's')).join('') +
        _.values(_.pick(fragments, 'h', 'm', 's')).join(separator);

      return _.template(fragment, ts);
    };

    return {
      format: formatString,
      html: html,
      units: parse(formatString),
      periods: periods
    };
  };

  App = {
    displayOptions: function(options) {
      options = _.defaults(options, {
        bgcolor: 'white',
        color: 'black'
      });

      $('body').css({
        backgroundColor: options.bgcolor,
        color: options.color
      }).fitText(1.5);
    },

    initialize: function() {
      var params, count;

      params = _.defaults(_.getParams(), {
        year: '1970',
        month: 'January',
        day: '01',
        hour: '00',
        minute: '00',
        second: '00'
      });

      count = new Countdown('#count', _.toDate(params), params.format);

      this.displayOptions(_.pick(params, 'color', 'bgcolor'));
    }
  };

  $(function() { App.initialize(); });
}(this));
