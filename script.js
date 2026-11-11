console.log("-----------------------------------Q1-----------------------------------");

function buildLoanRows(data) {
    const { books, readers, loans } = data;

    if (loans.length === 0) {
        return [];
    }

    function buildRow(loan) {
        const { id, bookId, readerId, elapsedDays, returned } = loan;

        function findBookById(book) {
            return bookId === book.id;
        }
        const findBook = books.find(findBookById);

        function findReaderById(reader) {
            return readerId === reader.id;
        }

        const findReader = readers.find(findReaderById);

        let status = null;
        let remainingDays = 0;
        let overdueDays = 0;

        if (returned) {
            status = "returned";
            remainingDays = 0;
            overdueDays = 0;
        } else if (!returned && elapsedDays <= findBook.policy.loanDays) {
            status = "on-time";
            remainingDays = findBook.policy.loanDays - elapsedDays;
        } else if (!returned && loan.elapsedDays > findBook.policy.loanDays) {
            status = "overdue";
            overdueDays = elapsedDays - findBook.policy.loanDays;
        }

        const newLoan = {
            loanId: id,
            bookTitle: findBook.title,
            readerLabel: findReader?.profile?.displayName
                ? findReader.profile.displayName
                : "عضو ناشناس",
            emailLabel: findReader?.contact?.email
                ? findReader.contact.email
                : "ایمیل ثبت نشده",
            status,
            remainingDays,
            overdueDays,
        };

        return newLoan;
    }
    // let loanRows = [];
    // for (const loan of loans) {
    //   const { id, bookId, readerId, elapsedDays, returned } = loan;

    //   function findBookFunc(book){
    //     return (bookId === book.id)
    //   }
    //   const findBook = books.find(findBookFunc)

    //   const newRow = {
    //     loanId : id,
    //     bookTitle : findBook.title
    //   }

    // }

    return loans.map(buildRow);

}

const resultOfBuildLoanRows = buildLoanRows(libraryData);
console.log(resultOfBuildLoanRows);

