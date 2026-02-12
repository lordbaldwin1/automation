import type { TestCase } from "../tests/budget-tracker.spec";

export const TEST_CASES: TestCase[] = [
  {
    entries: [
      {
        date: "2024-12-25",
        description: "Income 1",
        type: "income",
        amount: "100",
        toDelete: false,
      },
    ],
    total: "$100.00",
    endCount: 1,
  },
  {
    entries: [
      {
        date: "2025-01-01",
        description: "Expense 1",
        type: "expense",
        amount: "75",
        toDelete: false,
      },
    ],
    total: "-$75.00",
    endCount: 1,
  },
  {
    entries: [
      {
        date: "2024-12-25",
        description: "Income 1",
        type: "income",
        amount: "50",
        toDelete: false,
      },
      {
        date: "2024-12-26",
        description: "Income 2",
        type: "income",
        amount: "25.50",
        toDelete: false,
      },
    ],
    total: "$75.50",
    endCount: 2,
  },
  {
    entries: [
      {
        date: "2025-01-10",
        description: "Expense 1",
        type: "expense",
        amount: "10",
        toDelete: false,
      },
      {
        date: "2025-01-12",
        description: "Expense 2",
        type: "expense",
        amount: "20.75",
        toDelete: false,
      },
    ],
    total: "-$30.75",
    endCount: 2,
  },
  {
    entries: [
      {
        date: "2025-02-01",
        description: "Income 1",
        type: "income",
        amount: "150.25",
        toDelete: false,
      },
      {
        date: "2025-02-02",
        description: "Expense 1",
        type: "expense",
        amount: "50",
        toDelete: false,
      },
      {
        date: "2025-02-03",
        description: "Income 2",
        type: "income",
        amount: "49.75",
        toDelete: false,
      },
      {
        date: "2025-02-04",
        description: "Expense 2",
        type: "expense",
        amount: "75",
        toDelete: false,
      },
      {
        date: "2025-02-05",
        description: "Income 3",
        type: "income",
        amount: "10",
        toDelete: false,
      },
    ],
    total: "$85.00",
    endCount: 5,
  },
  {
    entries: [
      {
        date: "2025-03-01",
        description: "Expense To Keep",
        type: "expense",
        amount: "20.00",
        toDelete: false,
      },
      {
        date: "2025-03-02",
        description: "Expense To Delete",
        type: "expense",
        amount: "40.00",
        toDelete: true,
      },
      {
        date: "2025-03-03",
        description: "Income To Keep 1",
        type: "income",
        amount: "30.00",
        toDelete: false,
      },
      {
        date: "2025-03-04",
        description: "Income To Delete",
        type: "income",
        amount: "50.00",
        toDelete: true,
      },
      {
        date: "2025-03-05",
        description: "Income To Keep 2",
        type: "income",
        amount: "25.00",
        toDelete: false,
      },
    ],
    total: "$35.00",
    endCount: 3,
  },
];