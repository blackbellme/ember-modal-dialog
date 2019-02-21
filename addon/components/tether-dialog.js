import Ember from 'ember';
import ModalDialog from './modal-dialog';
import layout from '../templates/components/tether-dialog';

const { dasherize } = Ember.String;
const { computed, get } = Ember;

export default ModalDialog.extend({
  layout,

  targetAttachmentClass: computed('targetAttachment', function() {
    let targetAttachment = this.get('targetAttachment') || '';
    return `ember-modal-dialog-target-attachment-${dasherize(targetAttachment)}`;
  }),

  isIOS: computed(function() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
  }),

  targetAttachment: 'middle center',
  attachment: 'middle center',
  hasOverlay: true,
  target: 'viewport', // element, css selector, view instance, 'viewport', or 'scroll-handle'

  tetherClassPrefix: 'ember-tether',
  // offset - passed in
  // targetOffset - passed in
  // targetModifier - passed in

  makeOverlayClickableOnIOS: Ember.on('didInsertElement', function() {
    if (this.get('isIOS') && get(this, 'hasOverlay')) {
      Ember.$('div[data-ember-modal-dialog-overlay]').css('cursor', 'pointer');
    }
  })

});
