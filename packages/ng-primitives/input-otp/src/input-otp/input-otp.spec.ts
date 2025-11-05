import { TestBed } from '@angular/core/testing';
import { NgpInputOtp } from './input-otp';

describe('NgpInputOtp', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      expect(directive).toBeTruthy();
    });
  });

  it('should have default maxLength of 6', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      expect(directive.maxLength()).toBe(6);
    });
  });

  it('should have default disabled state of false', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      expect(directive.disabled()).toBe(false);
    });
  });

  it('should set value correctly', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      directive.setValue('123456');
      expect(directive.value()).toBe('123456');
    });
  });

  it('should truncate value to maxLength', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      directive.setValue('12345678');
      expect(directive.value()).toBe('123456');
    });
  });

  it('should detect when complete', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      directive.setValue('123456');
      expect(directive.isComplete()).toBe(true);
    });
  });

  it('should detect when not complete', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      directive.setValue('123');
      expect(directive.isComplete()).toBe(false);
    });
  });

  it('should get character at index', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      directive.setValue('123456');
      expect(directive.getCharAt(0)).toBe('1');
      expect(directive.getCharAt(5)).toBe('6');
    });
  });

  it('should return empty string for invalid index', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      directive.setValue('123');
      expect(directive.getCharAt(5)).toBe('');
    });
  });

  it('should implement ControlValueAccessor', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      expect(directive.writeValue).toBeDefined();
      expect(directive.registerOnChange).toBeDefined();
      expect(directive.registerOnTouched).toBeDefined();
      expect(directive.setDisabledState).toBeDefined();
    });
  });

  it('should write value through ControlValueAccessor', () => {
    TestBed.runInInjectionContext(() => {
      const directive = new NgpInputOtp();
      directive.writeValue('789012');
      expect(directive.value()).toBe('789012');
    });
  });
});
