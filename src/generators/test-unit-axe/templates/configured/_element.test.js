import '../<%= hyphenatedName %>.js';
import { runConstructor } from '@brightspace-ui/testing';

describe('<%= className %>', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('<%= tagName %>');
		});
	});

});
