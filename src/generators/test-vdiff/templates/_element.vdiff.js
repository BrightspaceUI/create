import '../<%= hyphenatedName %>.js';
import { expect, fixture, html } from '@brightspace-ui/testing';

describe('<%= tagName %>', () => {

	it('default', async() => {
		const elem = await fixture(html`<<%= tagName %>></<%= tagName %>>`);
		await expect(elem).to.be.golden();
	});

});
