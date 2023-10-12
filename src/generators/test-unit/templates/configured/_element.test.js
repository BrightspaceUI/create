import '../<%= hyphenatedName %>.js';
import { expect, fixture, html, runConstructor } from '@brightspace-ui/testing';

describe('<%= className %>', () => {

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<<%= tagName %>></<%= tagName %>>`);
			await expect(el).to.be.accessible();
		});
	});

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('<%= tagName %>');
		});
	});

});
