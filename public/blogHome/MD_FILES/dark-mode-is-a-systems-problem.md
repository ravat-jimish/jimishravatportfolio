# Dark mode is a systems problem

Dark mode is not a simple color inversion. It changes the relationship between hierarchy, contrast, elevation, and attention.

## Start with hierarchy

Text, surfaces, borders, and interactive states each need a role. A dark background does not mean every surface should become the same shade.

```scss
$background: #171c28;
$surface: rgba(255, 255, 255, 0.06);
$muted: #a9b0bd;
```

## Test real content

Long headings, disabled controls, error messages, and images reveal problems much faster than a small color palette does. Theme work is complete when the whole interface remains legible and calm.
