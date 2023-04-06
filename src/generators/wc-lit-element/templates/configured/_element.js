import { css, html, LitElement } from 'lit';
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

	constructor() {
		super();

		this.prop1 = '<%= hyphenatedName %>';
	}
<%= localizeResources %>
	render() {
		return html`
			<h2><%= localizeDemo %> ${this.prop1}!</h2>
		`;
	}

}
customElements.define('<%= tagName %>', <%= className %>);
