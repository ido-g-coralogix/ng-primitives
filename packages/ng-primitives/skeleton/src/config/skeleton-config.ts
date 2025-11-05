import { InjectionToken, Provider, inject } from '@angular/core';

export interface NgpSkeletonConfig {
  /**
   * The default CSS classes to apply to skeleton elements
   * @default ''
   */
  class: string;
}

export const defaultSkeletonConfig: NgpSkeletonConfig = {
  class: '',
};

export const NgpSkeletonConfigToken = new InjectionToken<NgpSkeletonConfig>(
  'NgpSkeletonConfigToken',
);

/**
 * Provide the default Skeleton configuration
 * @param config The Skeleton configuration
 * @returns The provider
 */
export function provideSkeletonConfig(config: Partial<NgpSkeletonConfig>): Provider[] {
  return [
    {
      provide: NgpSkeletonConfigToken,
      useValue: { ...defaultSkeletonConfig, ...config },
    },
  ];
}

/**
 * Inject the Skeleton configuration
 * @returns The global Skeleton configuration
 */
export function injectSkeletonConfig(): NgpSkeletonConfig {
  return inject(NgpSkeletonConfigToken, { optional: true }) ?? defaultSkeletonConfig;
}
