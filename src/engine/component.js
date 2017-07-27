export default function component(value) {
	return function decorator(target) {
      target.meta = value;
   }
}