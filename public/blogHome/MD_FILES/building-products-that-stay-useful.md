# Building products that stay useful

A product is not finished when it ships. It becomes useful when people can understand it, trust it, and return to it without friction.

## Start with the job

Before choosing a library or designing a screen, write down the job the user is trying to complete. This keeps the implementation grounded in a real outcome.

```js
const productDecision = {
  userNeed: "complete a task with confidence",
  constraint: "keep the workflow understandable",
  measure: "fewer unnecessary decisions"
};
```

The best long-term decisions are often the least glamorous: clear names, predictable states, useful empty screens, and documentation that someone can actually find.

## Leave room to evolve

Good software makes the next change easier. Keep boundaries understandable, avoid clever abstractions too early, and let feedback shape the next iteration.

> Build for the person using the product today, while leaving a clear path for the person maintaining it tomorrow.
