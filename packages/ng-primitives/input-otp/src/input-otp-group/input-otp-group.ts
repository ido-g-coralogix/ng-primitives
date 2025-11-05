import { Directive } from '@angular/core';

/**
 * Apply the `ngpInputOtpGroup` directive to an element that represents a group of OTP slots.
 * This is primarily used for visual grouping and styling purposes.
 */
@Directive({
  selector: '[ngpInputOtpGroup]',
  exportAs: 'ngpInputOtpGroup',
  host: {
    role: 'group',
  },
})
export class NgpInputOtpGroup {}
