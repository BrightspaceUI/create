import '../<%= hyphenatedName %>.js';
import { runConstructor } from '@brightspace-ui/testing';

describe('<%= tagName %>', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('<%= tagName %>');
		});
	});

});
