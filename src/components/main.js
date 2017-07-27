import {module} from 'engine';
import group from './group/group.js';
import './main.scss';
@module({
	components: [
		group
	],
	boot:group
})
export default class application {

	constructor() {
		
	}	

}
