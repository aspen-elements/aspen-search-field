import { PolymerElement,html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@polymer/iron-icon/iron-icon.js'

import './asp-icons.js'
/**
 * `aspen-search-field` This component allows the user to perform a search.  The class contains a "reset" button that clears
 *  the searchTerm.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class AspenSearchField extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
                --background-color: transparent;
                --input-background-color: #909090;
                --color: white;
                --width: 410px;
            }

            iron-icon[visible]{
                display: block;
                color: var(color);
            }
            iron-icon{
                display: none;
                color: var(--color);
            }

            vaadin-text-field{
                color: var(--color);
                width: var(--width);
            }

            vaadin-text-field [part="input-field"]{
                background-color: white;                
                color: var(--color);
            }
            vaadin-text-field [part="value"]{
                background-color: var(--input-background-color) ;
                color: var(--color);
            }
            
        </style>

        <vaadin-text-field label="[[label]]" placeholder="[[placeholder]]" value="{{value}}" autofocus="">
            <iron-icon id="reset" visible\$="[[isVisible]]" icon="aspen:cancel" on-tap="__handleClear" slot="suffix"></iron-icon>
        </vaadin-text-field>
`;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
      return 'aspen-search-field';
  }


  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
      return {

          /** The placeholder value displayed in the search field. */
          placeholder:{
              type: String,
              value: ''
          },

          /** A flag that indicates if the 'reset' button is visible or not. */
          isVisible:{
              type: Boolean,
              value: false
          },

          /** The label for the search field.*/
          label:{
              type: String,
              value: ''
          },

          /** The value of the search field. */
          value:{
              type: String,
              value: '',
              observer: '__handleChange'
          }
          
      };
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
      super();
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized. 
   */
  ready() {
      super.ready();

      afterNextRender(this, function() {
          
      });
  }

  /**
   * This method insures that the field value is cleared if the user presses on the 
   * @param {String} value the search term value
   */
  __handleChange(value){
      
      // if there are no characters in the search field, hide the 'reset' button.
      let isVisible = (value.length > 0)
      this.set('isVisible', isVisible);

      // tell the listener that the search term has changed.
      this.dispatchEvent(new CustomEvent('search-term-changed', {
          bubbles: true,
          composed: true,
          detail: {
              searchTerm: value
          }
      }));

  }

  /**
   * This method insures that the field value is cleared if the user presses on the 'reset' icon.
   * @param {Event} e the event object
   */
  __handleClear(e){
      this.set("value", '');
  }
}

window.customElements.define(AspenSearchField.is, AspenSearchField);
