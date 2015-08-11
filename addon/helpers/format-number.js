import formatNumber from '../format-number';
import Ember from 'ember';

export default Ember.Helper.helper(function(params, options) {
  var value = params[0];
  return formatNumber(value, options);
});
