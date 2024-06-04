import { css, html, LitElement } from 'lit';
import '@brightspace-ui/core/components/alert/alert.js';
import buildConfig from '../utilities/buildConfig.js';

class <%= className %> extends LitElement {

    static get properties() {
        return {
            prop1: { type: String },
        };
    }

    static get styles() {
        return css`
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
            Hello ${this.prop1}!
            <d2l-alert type="default">
                Development: ${buildConfig.development ? 'True' : 'False'}
            </d2l-alert>
        `;
    }
}
customElements.define('<%= tagName %>', <%= className %>);
