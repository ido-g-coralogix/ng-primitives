import {
  ComponentRef,
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';
import { NgpSkeleton } from '../skeleton/skeleton';

@Directive({
  selector: '[ngpSkeletonLoader]',
})
export class NgpSkeletonLoader {
  /**
   * Whether the skeleton is loading.
   */
  readonly isLoading = input.required<boolean>({
    alias: 'ngpSkeletonLoader',
  });

  /**
   * The number of skeleton elements to display.
   */
  readonly count = input(1, { alias: 'ngpSkeletonLoaderCount' });

  /**
   * The CSS class to apply to the skeleton elements.
   */
  readonly class = input<string>('', {
    alias: 'ngpSkeletonLoaderClass',
  });

  readonly #templateRef = inject(TemplateRef);
  readonly #viewContainerRef = inject(ViewContainerRef);

  #componentRefs: ComponentRef<NgpSkeleton>[] = [];

  constructor() {
    effect(() => {
      const isLoading = this.isLoading();
      const count = this.count();
      const className = this.class();

      this.#viewContainerRef.clear();
      this.#componentRefs.forEach(ref => ref.destroy());
      this.#componentRefs = [];

      if (isLoading) {
        this.#componentRefs = Array.from({ length: count }).map(() => {
          const componentRef = this.#viewContainerRef.createComponent(NgpSkeleton);
          if (className) {
            componentRef.setInput('ngpSkeletonClass', className);
          }
          return componentRef;
        });
      } else {
        this.#viewContainerRef.createEmbeddedView(this.#templateRef);
      }
    });
  }
}
