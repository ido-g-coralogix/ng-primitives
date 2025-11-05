import { Directive } from '@angular/core';

/**
 * Apply the `ngpInputOtpSeparator` directive to an element that represents a separator between OTP slot groups.
 * This is primarily used for visual separation purposes.
 */
@Directive({
  selector: '[ngpInputOtpSeparator]',
  exportAs: 'ngpInputOtpSeparator',
  host: {
    role: 'separator',
    '[attr.aria-hidden]': 'true',
  },
})
export class NgpInputOtpSeparator {}
