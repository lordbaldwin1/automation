# qaplayground

## Notes

7. Locator Priority


Prefer these (most to least recommended):


1. page.getByRole() — accessibility-based, most resilient

2. page.getByLabel() — for form fields

3. page.getByPlaceholder() — for inputs

4. page.getByText() — for visible text

5. page.getByTestId() — when you control the markup

6. page.locator('css') — last resort

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.23. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
