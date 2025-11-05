# ng-primitives/input-otp

An accessible one-time password input component for Angular applications.

## Installation

Secondary entry point of `ng-primitives`. It can be used by importing from `ng-primitives/input-otp`.

## Features

- Fully accessible with ARIA attributes
- Keyboard navigation support (Arrow keys, Backspace, Delete)
- Paste support for OTP codes
- Reactive Forms integration (ControlValueAccessor)
- Customizable slot count
- Event emitted when all slots are filled
- Support for grouping and separators

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { NgpInputOtp, NgpInputOtpSlot } from 'ng-primitives/input-otp';

@Component({
  standalone: true,
  imports: [NgpInputOtp, NgpInputOtpSlot],
  template: `
    <div ngpInputOtp [ngpInputOtpMaxLength]="6">
      <div ngpInputOtpSlot="0"></div>
      <div ngpInputOtpSlot="1"></div>
      <div ngpInputOtpSlot="2"></div>
      <div ngpInputOtpSlot="3"></div>
      <div ngpInputOtpSlot="4"></div>
      <div ngpInputOtpSlot="5"></div>
    </div>
  `,
})
export class MyComponent {}
```

### With Groups and Separators

```typescript
import { Component } from '@angular/core';
import {
  NgpInputOtp,
  NgpInputOtpGroup,
  NgpInputOtpSlot,
  NgpInputOtpSeparator,
} from 'ng-primitives/input-otp';

@Component({
  standalone: true,
  imports: [NgpInputOtp, NgpInputOtpGroup, NgpInputOtpSlot, NgpInputOtpSeparator],
  template: `
    <div ngpInputOtp [ngpInputOtpMaxLength]="6">
      <div ngpInputOtpGroup>
        <div ngpInputOtpSlot="0"></div>
        <div ngpInputOtpSlot="1"></div>
        <div ngpInputOtpSlot="2"></div>
      </div>
      <div ngpInputOtpSeparator>-</div>
      <div ngpInputOtpGroup>
        <div ngpInputOtpSlot="3"></div>
        <div ngpInputOtpSlot="4"></div>
        <div ngpInputOtpSlot="5"></div>
      </div>
    </div>
  `,
})
export class MyComponent {}
```

### With Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgpInputOtp, NgpInputOtpSlot } from 'ng-primitives/input-otp';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgpInputOtp, NgpInputOtpSlot],
  template: `
    <div ngpInputOtp [formControl]="otpControl" [ngpInputOtpMaxLength]="6">
      <div ngpInputOtpSlot="0"></div>
      <div ngpInputOtpSlot="1"></div>
      <div ngpInputOtpSlot="2"></div>
      <div ngpInputOtpSlot="3"></div>
      <div ngpInputOtpSlot="4"></div>
      <div ngpInputOtpSlot="5"></div>
    </div>
  `,
})
export class MyComponent {
  otpControl = new FormControl('');
}
```

## API Reference

### NgpInputOtp

The main container directive for the OTP input.

#### Inputs

- `ngpInputOtpMaxLength: number` - The maximum length of the OTP (default: 6)
- `ngpInputOtpDisabled: boolean` - Whether the input is disabled (default: false)

#### Outputs

- `ngpInputOtpCompleted: string` - Emitted when all slots are filled with the complete OTP value

#### ControlValueAccessor

The directive implements `ControlValueAccessor` and can be used with Angular Reactive Forms.

### NgpInputOtpSlot

Represents an individual character slot in the OTP input.

#### Inputs

- `ngpInputOtpSlot: number` (required) - The index of the slot (0-based)
- `ngpInputOtpSlotDisabled: boolean` - Whether this specific slot is disabled (default: false)

### NgpInputOtpGroup

A container directive for grouping OTP slots together for visual organization.

### NgpInputOtpSeparator

A directive for visual separators between slot groups.

## Keyboard Navigation

- **Numbers/Letters**: Enter a character in the current slot and move to the next
- **Backspace**: Delete the character in the current or previous slot and move back
- **Delete**: Delete the character in the current slot
- **Arrow Left/Right**: Navigate between slots
- **Paste**: Automatically fills all slots with the pasted content
