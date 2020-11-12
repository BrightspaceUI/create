import { css, html, LitElement } from 'lit-element/lit-element.js';
<%= localizeMixin %>
class <%= className %> extends <%= extends %> {

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
<%= localizeResources %>
	constructor() {
		super();

		this.prop1 = '<%= hyphenatedName %>';
	}

	render() {
		return html`
			<h2>Hello ${this.prop1}!</h2><%= localizeDemo %>
		`;
	}
}
customElements.define('<%= tagName %>', <%= className %>);
