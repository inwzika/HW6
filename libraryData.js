// Public input only. Load this classic script before your app.js.
const libraryData = {
  books: [
    { id: "B1", title: "داستان کوتاه", policy: { loanDays: 14 } },
    { id: "B2", title: "شروع CSS", policy: { loanDays: 7 } },
    { id: "B3", title: "راهنمای HTML", policy: { loanDays: 14 } },
    { id: "B4", title: "دفتر سفر", policy: { loanDays: 10 } },
  ],
  readers: [
    {
      id: "R1",
      profile: { displayName: "مینا نمونه" },
      contact: { email: "mina@example.com" },
    },
    { id: "R2", 
      profile: { displayName: "آرمان نمونه" }, 
      contact: null 
    },
    { 
      id: "R3", 
      profile: { displayName: "پارسا نمونه" } 
    },
    {
      id: "R4",
      profile: { displayName: "لیلا نمونه" },
      contact: { email: "" },
    },
    {
      id: "R5",
      profile: { displayName: "ندا نمونه" },
      contact: { email: "neda@example.com" },
    },
  ],
  loans: [
    {
      id: "L1",
      bookId: "B1",
      readerId: "R1",
      elapsedDays: 17,
      returned: false,
      reminder: { requested: false, note: "پیگیری آموزشی" },
    },
    {
      id: "L2",
      bookId: "B2",
      readerId: "R2",
      elapsedDays: 10,
      returned: false,
      reminder: { requested: false, note: "پیگیری آموزشی" },
    },
    {
      id: "L3",
      bookId: "B3",
      readerId: "R1",
      elapsedDays: 14,
      returned: false,
      reminder: { requested: false, note: "پیگیری آموزشی" },
    },
    {
      id: "L4",
      bookId: "B2",
      readerId: "R3",
      elapsedDays: 8,
      returned: true,
      reminder: { requested: false, note: "پیگیری آموزشی" },
    },
    {
      id: "L5",
      bookId: "B4",
      readerId: "R99",
      elapsedDays: 12,
      returned: false,
      reminder: { requested: false, note: "پیگیری آموزشی" },
    },
    {
      id: "L6",
      bookId: "B3",
      readerId: "R4",
      elapsedDays: 1,
      returned: false,
      reminder: { requested: false, note: "پیگیری آموزشی" },
    },
  ],
};

const emptyLibraryData = { books: [], readers: [], loans: [] };
