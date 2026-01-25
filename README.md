# qaplayground

## Notes

Locator Priority


Prefer these (most to least recommended):


1. page.getByRole() — accessibility-based, most resilient

2. page.getByLabel() — for form fields

3. page.getByPlaceholder() — for inputs

4. page.getByText() — for visible text

5. page.getByTestId() — when you control the markup

6. page.locator('css') — last resort

Here are the most popular Playwright actions:
Action	Description
locator.check()	Check the input checkbox
locator.click()	Click the element
locator.uncheck()	Uncheck the input checkbox
locator.hover()	Hover mouse over the element
locator.fill()	Fill the form field, input text
locator.focus()	Focus the element
locator.press()	Press single key
locator.setInputFiles()	Pick files to upload
locator.selectOption()	Select option in the drop down

Here are the most popular async assertions:

Assertion	Description
expect(locator).toBeChecked()	Checkbox is checked
expect(locator).toBeEnabled()	Control is enabled
expect(locator).toBeVisible()	Element is visible
expect(locator).toContainText()	Element contains text
expect(locator).toHaveAttribute()	Element has attribute
expect(locator).toHaveCount()	List of elements has given length
expect(locator).toHaveText()	Element matches text
expect(locator).toHaveValue()	Input element has value
expect(page).toHaveTitle()	Page has title
expect(page).toHaveURL()	Page has URL

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.23. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
