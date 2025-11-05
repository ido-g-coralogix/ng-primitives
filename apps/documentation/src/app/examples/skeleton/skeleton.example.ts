import { Component, signal } from '@angular/core';
import { NgpSkeleton, NgpSkeletonLoader } from 'ng-primitives/skeleton';

@Component({
  selector: 'app-skeleton',
  imports: [NgpSkeleton, NgpSkeletonLoader],
  template: `
    <div class="space-y-6">
      <!-- Basic Skeleton Examples -->
      <div>
        <h3 class="mb-3 text-sm font-medium">Basic Skeletons</h3>
        <div class="space-y-3">
          <!-- Rectangle skeleton -->
          <div ngpSkeleton ngpSkeletonClass="w-[200px] h-5 rounded animate-pulse bg-gray-200"></div>

          <!-- Circle skeleton -->
          <div
            ngpSkeleton
            ngpSkeletonClass="w-12 h-12 rounded-full animate-pulse bg-gray-200"
          ></div>
        </div>
      </div>

      <!-- Skeleton Loader Examples -->
      <div>
        <h3 class="mb-3 text-sm font-medium">Skeleton Loader</h3>
        <div class="space-y-4">
          <button
            class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            (click)="toggleLoading()"
          >
            Toggle Loading ({{ isLoading() ? 'Loading...' : 'Loaded' }})
          </button>

          <!-- Single skeleton with content -->
          <div
            *ngpSkeletonLoader="
              isLoading();
              class: 'w-full h-32 rounded-lg animate-pulse bg-gray-200'
            "
          >
            <div class="rounded-lg border p-4">
              <h4 class="mb-2 text-lg font-bold">Card Title</h4>
              <p>This is the actual content that appears when loading is complete.</p>
            </div>
          </div>

          <!-- Multiple skeletons -->
          <div class="space-y-2">
            <div
              *ngpSkeletonLoader="
                isLoading();
                count: 3;
                class: 'w-full h-12 rounded mb-2 animate-pulse bg-gray-200'
              "
            >
              <div class="space-y-2">
                <div class="rounded border p-3">Item 1</div>
                <div class="rounded border p-3">Item 2</div>
                <div class="rounded border p-3">Item 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class SkeletonExample {
  readonly isLoading = signal(true);

  toggleLoading(): void {
    this.isLoading.set(!this.isLoading());
  }
}
