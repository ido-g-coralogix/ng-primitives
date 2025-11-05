import { render } from '@testing-library/angular';
import { provideSkeletonConfig } from '../config/skeleton-config';
import { NgpSkeleton } from './skeleton';

describe('NgpSkeleton', () => {
  it('should create a default skeleton', async () => {
    const container = await render(`<div ngpSkeleton></div>`, {
      imports: [NgpSkeleton],
    });

    const skeleton = container.container.querySelector('[data-skeleton]');
    expect(skeleton).toBeTruthy();
  });

  it('should apply custom class', async () => {
    const container = await render(
      `<div ngpSkeleton ngpSkeletonClass="custom-skeleton-class"></div>`,
      {
        imports: [NgpSkeleton],
      },
    );

    const skeleton = container.container.querySelector('[data-skeleton]');
    expect(skeleton?.classList.contains('custom-skeleton-class')).toBe(true);
  });

  it('should allow the global class to be set', async () => {
    const container = await render(`<div ngpSkeleton></div>`, {
      imports: [NgpSkeleton],
      providers: [provideSkeletonConfig({ class: 'global-skeleton-class' })],
    });

    const skeleton = container.container.querySelector('[data-skeleton]');
    expect(skeleton?.classList.contains('global-skeleton-class')).toBe(true);
  });
});
