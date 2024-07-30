import '../<%= hyphenatedName %>.js';
import { expect, fixture, html } from '@brightspace-ui/testing';

describe('<%= tagName %>', () => {

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<<%= tagName %>></<%= tagName %>>`);
			await expect(el).to.be.accessible();
		});
	});

});
