import { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  computed,
  Directive,
  HostListener,
  input,
  numberAttribute,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { setupInteractions } from 'ng-primitives/interactions';
import { injectElementRef } from 'ng-primitives/internal';
import { injectInputOtpState } from '../input-otp/input-otp-state';

/**
 * Apply the `ngpInputOtpSlot` directive to an element that represents an individual OTP slot.
 */
@Directive({
  selector: '[ngpInputOtpSlot]',
  exportAs: 'ngpInputOtpSlot',
  host: {
    '[attr.data-disabled]': 'inputOtp().disabled() ? "" : null',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.tabindex]': '0',
    role: 'textbox',
    '[attr.aria-label]': '"Character " + (index() + 1)',
  },
})
export class NgpInputOtpSlot implements OnInit, OnDestroy {
  /**
   * Access the input-otp.
   */
  protected readonly inputOtp = injectInputOtpState();

  /**
   * Access the element reference.
   */
  private readonly elementRef = injectElementRef<HTMLElement>();

  /**
   * The index of the slot.
   */
  readonly index = input.required<number, string | number>({
    alias: 'ngpInputOtpSlot',
    transform: numberAttribute,
  });

  /**
   * Whether the slot is disabled.
   */
  readonly disabled = input<boolean, BooleanInput>(false, {
    alias: 'ngpInputOtpSlotDisabled',
    transform: booleanAttribute,
  });

  /**
   * The character displayed in this slot.
   */
  readonly char = computed(() => this.inputOtp().getCharAt(this.index()));

  /**
   * Whether this slot is the active (focused) slot.
   */
  readonly isActive = computed(() => {
    const currentLength = this.inputOtp().value().length;
    return currentLength === this.index();
  });

  constructor() {
    setupInteractions({
      hover: true,
      press: true,
      focusVisible: true,
      disabled: computed(() => this.disabled() || this.inputOtp().disabled()),
    });
  }

  ngOnInit(): void {
    this.inputOtp().registerSlot(this);
  }

  ngOnDestroy(): void {
    this.inputOtp().unregisterSlot(this);
  }

  /**
   * Focus this slot.
   * @internal
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  @HostListener('focus')
  onFocus(): void {
    // When a slot is focused, select all text if any
    const selection = window.getSelection();
    if (selection) {
      selection.selectAllChildren(this.elementRef.nativeElement);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const otp = this.inputOtp();

    if (otp.disabled() || this.disabled()) {
      event.preventDefault();
      return;
    }

    const currentValue = otp.value();
    const currentIndex = this.index();
    const maxLength = otp.maxLength();

    // Handle backspace
    if (event.key === 'Backspace') {
      event.preventDefault();

      if (currentIndex < currentValue.length) {
        // Remove character at current position
        const newValue = currentValue.slice(0, currentIndex) + currentValue.slice(currentIndex + 1);
        otp.setValue(newValue);
      } else if (currentIndex > 0) {
        // Remove previous character and move focus back
        const newValue = currentValue.slice(0, currentIndex - 1) + currentValue.slice(currentIndex);
        otp.setValue(newValue);
        otp.focusSlot(currentIndex - 1);
      }
      return;
    }

    // Handle delete
    if (event.key === 'Delete') {
      event.preventDefault();

      if (currentIndex < currentValue.length) {
        const newValue = currentValue.slice(0, currentIndex) + currentValue.slice(currentIndex + 1);
        otp.setValue(newValue);
      }
      return;
    }

    // Handle arrow keys
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (currentIndex > 0) {
        otp.focusSlot(currentIndex - 1);
      }
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (currentIndex < maxLength - 1) {
        otp.focusSlot(currentIndex + 1);
      }
      return;
    }

    // Handle character input (alphanumeric)
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();

      // Only accept alphanumeric characters
      if (/^[a-zA-Z0-9]$/.test(event.key)) {
        let newValue: string;

        if (currentIndex < currentValue.length) {
          // Replace character at current position
          newValue =
            currentValue.slice(0, currentIndex) + event.key + currentValue.slice(currentIndex + 1);
        } else {
          // Append character
          newValue = currentValue + event.key;
        }

        if (newValue.length <= maxLength) {
          otp.setValue(newValue);

          // Move to next slot if not at the end
          if (currentIndex < maxLength - 1) {
            otp.focusSlot(currentIndex + 1);
          }
        }
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const otp = this.inputOtp();

    if (otp.disabled() || this.disabled()) {
      return;
    }

    const pastedData = event.clipboardData?.getData('text') || '';
    const cleanedData = pastedData.replace(/\s/g, '').slice(0, otp.maxLength());

    // Only accept alphanumeric characters
    const validData = cleanedData.replace(/[^a-zA-Z0-9]/g, '');

    if (validData) {
      otp.setValue(validData);

      // Focus the next empty slot or the last slot
      const nextIndex = Math.min(validData.length, otp.maxLength() - 1);
      otp.focusSlot(nextIndex);
    }
  }
}
