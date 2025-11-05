import { Component, signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { NgpSkeleton } from '../skeleton/skeleton';
import { NgpSkeletonLoader } from './skeleton-directive';

describe('NgpSkeletonLoader', () => {
  it('should display skeleton when loading', async () => {
    @Component({
      template: `
        <div *ngpSkeletonLoader="isLoading()" data-testid="content">
          <p>Content</p>
        </div>
      `,
    })
    class TestComponent {
      isLoading = signal(true);
    }

    const container = await render(TestComponent, {
      imports: [NgpSkeletonLoader, NgpSkeleton],
    });

    const skeleton = container.container.querySelector('[data-skeleton]');
    expect(skeleton).toBeTruthy();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should display content when not loading', async () => {
    @Component({
      template: `
        <div *ngpSkeletonLoader="isLoading()" data-testid="content">
          <p>Content</p>
        </div>
      `,
    })
    class TestComponent {
      isLoading = signal(false);
    }

    const container = await render(TestComponent, {
      imports: [NgpSkeletonLoader, NgpSkeleton],
    });

    const skeleton = container.container.querySelector('[data-skeleton]');
    expect(skeleton).not.toBeTruthy();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should display multiple skeletons when count is specified', async () => {
    @Component({
      template: `
        <div *ngpSkeletonLoader="isLoading(); count: 3" data-testid="content">
          <p>Content</p>
        </div>
      `,
    })
    class TestComponent {
      isLoading = signal(true);
    }

    const container = await render(TestComponent, {
      imports: [NgpSkeletonLoader, NgpSkeleton],
    });

    const skeletons = container.container.querySelectorAll('[data-skeleton]');
    expect(skeletons.length).toBe(3);
  });

  it('should apply custom class to skeleton elements', async () => {
    @Component({
      template: `
        <div *ngpSkeletonLoader="isLoading(); class: 'custom-class'" data-testid="content">
          <p>Content</p>
        </div>
      `,
    })
    class TestComponent {
      isLoading = signal(true);
    }

    const container = await render(TestComponent, {
      imports: [NgpSkeletonLoader, NgpSkeleton],
    });

    const skeleton = container.container.querySelector('[data-skeleton]');
    expect(skeleton?.classList.contains('custom-class')).toBe(true);
  });

  it('should switch between loading and content states', async () => {
    @Component({
      template: `
        <div *ngpSkeletonLoader="isLoading()" data-testid="content">
          <p>Content</p>
        </div>
      `,
    })
    class TestComponent {
      isLoading = signal(true);
    }

    const container = await render(TestComponent, {
      imports: [NgpSkeletonLoader, NgpSkeleton],
    });

    let skeleton = container.container.querySelector('[data-skeleton]');
    expect(skeleton).toBeTruthy();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    container.fixture.componentInstance.isLoading.set(false);
    container.fixture.detectChanges();

    skeleton = container.container.querySelector('[data-skeleton]');
    expect(skeleton).not.toBeTruthy();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
