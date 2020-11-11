import { css, html, LitElement } from 'lit-element/lit-element.js';

class <%= className %> extends LitElement {

	static get properties() {
		return {
			prop1: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	constructor() {
		super();

		this.prop1 = '<%= hyphenatedName %>';
	}

	render() {
		return html`
			<h2>Hello ${this.prop1}!</h2>
		`;
	}
}
customElements.define('<%= tagName %>', <%= className %>);
