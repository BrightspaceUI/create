import '../<%= hyphenatedName %>.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('<%= className %>', () => {

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<<%= tagName %>></<%= tagName %>>`);
			await expect(el).to.be.accessible();
		});

		describe('constructor', () => {
			it('should construct', () => {
				const ctor = customElements.get('<%= tagName %>');
				expect(ctor).to.not.be.undefined;
				document.createElement('<%= tagName %>');
			});
		});

	});

});
