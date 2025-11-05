import { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  computed,
  Directive,
  forwardRef,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgpInputOtpSlot } from '../input-otp-slot/input-otp-slot';
import { inputOtpState, provideInputOtpState } from './input-otp-state';

/**
 * Apply the `ngpInputOtp` directive to an element that represents the OTP input container.
 */
@Directive({
  selector: '[ngpInputOtp]',
  exportAs: 'ngpInputOtp',
  providers: [
    provideInputOtpState(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgpInputOtp),
      multi: true,
    },
  ],
  host: {
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class NgpInputOtp implements ControlValueAccessor {
  /**
   * The maximum length of the OTP input.
   */
  readonly maxLength = input<number, string | number>(6, {
    alias: 'ngpInputOtpMaxLength',
    transform: numberAttribute,
  });

  /**
   * Whether the OTP input is disabled.
   */
  readonly disabled = input<boolean, BooleanInput>(false, {
    alias: 'ngpInputOtpDisabled',
    transform: booleanAttribute,
  });

  /**
   * Event emitted when all slots are filled.
   */
  readonly completed = output<string>({
    alias: 'ngpInputOtpCompleted',
  });

  /**
   * The current value of the OTP input.
   * @internal
   */
  readonly value = signal<string>('');

  /**
   * The registered slots.
   * @internal
   */
  readonly slots = signal<NgpInputOtpSlot[]>([]);

  /**
   * Whether all slots are filled.
   */
  readonly isComplete = computed(() => {
    const val = this.state.value();
    const max = this.state.maxLength();
    return val.length === max;
  });

  /**
   * The onChange callback.
   * @internal
   */
  private onChange: (value: string) => void = () => {
    // Placeholder for ControlValueAccessor callback
  };

  /**
   * The onTouched callback.
   * @internal
   */
  private onTouched: () => void = () => {
    // Placeholder for ControlValueAccessor callback
  };

  /**
   * The InputOtp state.
   */
  protected readonly state = inputOtpState<NgpInputOtp>(this);

  /**
   * Register a slot with the input-otp.
   * @param slot The slot to register.
   * @internal
   */
  registerSlot(slot: NgpInputOtpSlot): void {
    this.slots.update(slots => [...slots, slot]);
  }

  /**
   * Unregister a slot from the input-otp.
   * @param slot The slot to unregister.
   * @internal
   */
  unregisterSlot(slot: NgpInputOtpSlot): void {
    this.slots.update(slots => slots.filter(s => s !== slot));
  }

  /**
   * Set the value of the OTP input.
   * @param value The value to set.
   */
  setValue(value: string): void {
    const maxLen = this.state.maxLength();
    const newValue = value.slice(0, maxLen);

    this.value.set(newValue);
    this.onChange(newValue);
    this.onTouched();

    if (newValue.length === maxLen) {
      this.completed.emit(newValue);
    }
  }

  /**
   * Get the character at the specified index.
   * @param index The index.
   * @returns The character at the index.
   * @internal
   */
  getCharAt(index: number): string {
    return this.value()[index] || '';
  }

  /**
   * Focus the slot at the specified index.
   * @param index The index.
   * @internal
   */
  focusSlot(index: number): void {
    const slots = this.slots();
    if (index >= 0 && index < slots.length) {
      slots[index].focus();
    }
  }

  // ControlValueAccessor implementation

  /**
   * Write a value to the input-otp.
   * @param value The value to write.
   */
  writeValue(value: string): void {
    this.value.set(value || '');
  }

  /**
   * Register a callback for when the value changes.
   * @param fn The callback.
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Register a callback for when the input-otp is touched.
   * @param fn The callback.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Set the disabled state of the input-otp.
   * @param _isDisabled Whether the input-otp is disabled.
   */
  setDisabledState(_isDisabled: boolean): void {
    // This is handled through the disabled input
  }
}
