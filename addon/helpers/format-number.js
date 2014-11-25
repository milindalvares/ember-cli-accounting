import formatNumber from '../format-number';

export default function formatNumberHelper(value, options) {
  return formatNumber(value, options.hash);
}
