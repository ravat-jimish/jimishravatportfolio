# Choosing the simplest architecture that can grow

Complexity is easy to add and hard to remove. The right architecture gives the current product a clear shape without pretending to know every future requirement.

## A useful question

Ask what would need to change if the next requirement arrived tomorrow. If the answer is obvious, the boundary is probably healthy. If every change touches everything, it may be time to introduce one.

```js
function createFeature(dependencies) {
  return {
    run(input) {
      return dependencies.service.execute(input);
    }
  };
}
```

Start with a small, observable design. Let real pressure, not imagination, justify the next abstraction.
