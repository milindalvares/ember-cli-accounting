import formatMoney from '../format-money';
import Ember from 'ember';

var formatMoneyHelper;

if (Ember.HTMLBars) {
  formatMoneyHelper = function formatMoneyHelper(params, options) {
    var value = params[0];
    return formatMoney(value, options);
  };
} else {
  formatMoneyHelper = function formatMoneyHelper(value, options) {
    return formatMoney(value, options.hash);
  };
}

export default formatMoneyHelper;
