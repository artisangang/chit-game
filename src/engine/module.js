export default function module(value) {
	return function decorator(target) {
      target.prototype.module = value;
   }
}