import formatMoney from '../format-money';
import Ember from 'ember';

export default Ember.Helper.helper(function(params, options) {
  var value = params[0];
  return formatMoney(value, options);
});
