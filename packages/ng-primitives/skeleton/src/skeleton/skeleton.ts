import { Directive, computed, input } from '@angular/core';
import { injectSkeletonConfig } from '../config/skeleton-config';

@Directive({
  selector: '[ngpSkeleton]',
  exportAs: 'ngpSkeleton',
  host: {
    '[attr.data-skeleton]': '""',
    '[class]': 'computedClass()',
  },
})
export class NgpSkeleton {
  private readonly config = injectSkeletonConfig();

  /**
   * The CSS class to apply to the skeleton.
   */
  readonly class = input<string>(this.config.class, {
    alias: 'ngpSkeletonClass',
  });

  /**
   * The computed class to apply to the skeleton.
   * @internal
   */
  protected readonly computedClass = computed(() => this.class());
}
