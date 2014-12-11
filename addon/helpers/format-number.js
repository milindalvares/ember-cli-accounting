import formatNumber from '../format-number';
import Ember from 'ember';

var formatNumberHelper;

if (Ember.HTMLBars) {
  formatNumberHelper = function formatNumberHelper(params, options) {
    var value = params[0];
    return formatNumber(value, options);
  };
} else {
  formatNumberHelper = function formatNumberHelper(value, options) {
    return formatNumber(value, options.hash);
  };
}

export default formatNumberHelper;
