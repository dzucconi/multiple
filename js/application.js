/**
 * Multiple (2010-Present)
 * Damon Zucconi
 * CC BY-SA 3.0
 **/

var Event = function(params) {
  this.year    = params['year']    || "1900";
  this.month   = params['month']   || "January";
  this.day     = params['day']     || "01";
  this.hour    = params['hour']    || "00";
  this.minute  = params['minute']  || "00";
  this.second  = params['second']  || "00";
  this.format  = params['format']  || "YOWDHMS";
  this.bgcolor = params['bgcolor'] || "#FFFFFF";
  this.color   = params['color']   || "#000000"; 
}

var Utils = {
  getParams: function () {
    var _i,
        _hash,
        _vars   = {},
        _hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (_i = _hashes.length - 1; _i >= 0; _i--) {
      _hash = _hashes[_i].split('=');
      _vars[_hash[0]] = _hash[1];
    }

    return _vars;
  }
};

var Multiple = {
  helpers: {
    status: function(_target) {
      var _now = new Date();
      if (_now > _target) {
        return true;
      } else if (_now < _target) {
        return false;
      }
    },
  },

  initialize: function() {
    var _target,
        _event,
        _layout,
        _$el,
        _$count;
    
    _$el    = $('body');
    _$count = $('#count');
    _layout = '{yn}{yl} {on}{ol} {wn}{wl} {dn}{dl} {hnn}<span class="blink">{sep}</span>{mnn}<span class="blink">{sep}</span>{snn}'

    _target = new Event(Utils.getParams());
    _event  = new Date(
        _target.month   + 
        _target.day     + "," + 
        _target.year    + " " + 
        _target.hour    + ":" + 
        _target.minute  + ":" + 
        _target.second
      );

    _$el.css('backgroundColor', _target.bgcolor);

    if (Multiple.helpers.status(_event)) {
      _$count.
        countdown('destroy').
        css('color', _target.color).
        countdown({
            compact: true,
            since: _event,
            layout: _layout,
            format: _target.format
          });
    } else {
      _$count.
        countdown('destroy').
        css('color', _target.color).
        countdown({
            until: _event,
            compact: true,
            format: _target.format,
            layout: _layout,
            onExpiry: Multiple.initialize
          });
    }
  }
};

$(function () { Multiple.initialize(); });