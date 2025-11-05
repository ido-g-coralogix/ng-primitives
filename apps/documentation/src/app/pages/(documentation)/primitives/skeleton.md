---
name: 'Skeleton'
---

# Skeleton

A skeleton component for displaying loading placeholders during loading states.

<docs-example name="skeleton"></docs-example>

## Import

Import the Skeleton primitives from `ng-primitives/skeleton`.

```ts
import { NgpSkeleton, NgpSkeletonLoader } from 'ng-primitives/skeleton';
```

## Usage

### Basic Skeleton

Use the `ngpSkeleton` directive to display a skeleton element. You can customize the appearance using CSS classes.

```html
<!-- Rectangle skeleton -->
<div ngpSkeleton ngpSkeletonClass="w-[200px] h-5 rounded"></div>

<!-- Circle skeleton -->
<div ngpSkeleton ngpSkeletonClass="w-12 h-12 rounded-full"></div>
```

### Skeleton Loader (Structural Directive)

Use the `ngpSkeletonLoader` structural directive to conditionally display skeleton elements while content is loading.

```html
<!-- Single skeleton element -->
<div *ngpSkeletonLoader="isLoading; class: 'w-full h-5 rounded'">
  <p>Actual content shown when not loading</p>
</div>

<!-- Multiple skeleton elements -->
<div *ngpSkeletonLoader="isLoading; count: 3; class: 'w-full h-5 rounded'">
  <p>Actual content shown when not loading</p>
</div>
```

### Styling

The skeleton primitive provides a data attribute for styling:

```css
[data-skeleton] {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background-color: #e5e7eb;
}
```

## Global Configuration

You can configure the default skeleton settings globally using the `provideSkeletonConfig` function:

```ts
import { provideSkeletonConfig } from 'ng-primitives/skeleton';

bootstrapApplication(AppComponent, {
  providers: [
    provideSkeletonConfig({
      class: 'animate-pulse bg-gray-200',
    }),
  ],
});
```

## API Reference

The following directives are available to import from the `ng-primitives/skeleton` package:

### NgpSkeleton

Apply the skeleton directive to an element to display a loading placeholder.

- Selector: `[ngpSkeleton]`
- Exported As: `ngpSkeleton`

#### Data Attributes

| Attribute       | Description          | Value |
| --------------- | -------------------- | ----- |
| `data-skeleton` | The skeleton element | -     |

#### Inputs

| Input              | Description                            | Type     | Default |
| ------------------ | -------------------------------------- | -------- | ------- |
| `ngpSkeletonClass` | The CSS class to apply to the skeleton | `string` | `''`    |

### NgpSkeletonLoader

A structural directive that conditionally displays skeleton elements or content based on loading state.

- Selector: `[ngpSkeletonLoader]`

#### Inputs

| Input                    | Description                                     | Type      | Default  |
| ------------------------ | ----------------------------------------------- | --------- | -------- |
| `ngpSkeletonLoader`      | Whether the skeleton is loading                 | `boolean` | Required |
| `ngpSkeletonLoaderCount` | The number of skeleton elements to display      | `number`  | `1`      |
| `ngpSkeletonLoaderClass` | The CSS class to apply to the skeleton elements | `string`  | `''`     |

## Examples

### Card Loading State

```html
<div *ngpSkeletonLoader="isLoading; class: 'w-full h-32 rounded-lg'">
  <div class="card">
    <h2>{{ cardTitle }}</h2>
    <p>{{ cardContent }}</p>
  </div>
</div>
```

### List Loading State

```html
<div *ngpSkeletonLoader="isLoading; count: 5; class: 'w-full h-12 rounded mb-2'">
  <ul>
    <li *ngFor="let item of items">{{ item.name }}</li>
  </ul>
</div>
```

### Avatar Loading State

```html
<div *ngpSkeletonLoader="isLoading; class: 'w-10 h-10 rounded-full'">
  <img [src]="avatarUrl" alt="User avatar" />
</div>
```
