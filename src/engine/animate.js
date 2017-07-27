export default function animate(value) {
	return function decorator(target) {
      target.animation = value;
   }
}