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

console.log("-----------------------------------Q2-----------------------------------");


function buildLibraryReport(data) {
    const { readers, loans } = data;

    const loanRows = buildLoanRows(data);

    let loanCount = 0;
    // for (let i = 0; i < loanRows.length; i++) {
    //   loanCount++;
    // }

    loanCount = loanRows.length;

    function filterActiveLoans(loan) {
        return loan.status !== "returned"
    }

    const activeCounts = loanRows.filter(filterActiveLoans);
    const activeCount = activeCounts.length;

    function filterOverdue(loan) {

        return loan.status === "overdue"
    }

    const overdueCount = activeCounts.filter(filterOverdue).length;


    function totalOverdue(prevValue, loan) {
        return prevValue + loan.overdueDays;
    }

    const totalOverdueDays = activeCounts.reduce(totalOverdue, 0);


    let mostOverdueDays = 0;
    let mostOverdueLoanId = null;
    for (let i = 0; i < loanRows.length; i++) {
        if (mostOverdueDays < loanRows[i].overdueDays) {
            mostOverdueDays = loanRows[i].overdueDays;
            mostOverdueLoanId = loanRows[i].loanId;
        }
    }

    function unmatchedReaderFilter(loan) {
        return loan.readerLabel === "عضو ناشناس";
    }

    const unmatchedReaderLoanCount = loanRows.filter(unmatchedReaderFilter).length;

    // function unmatchLoan(loan) {
    //   const { readerId } = loan;

    //   function foundReaderFunc(reader) {
    //     return reader.id === readerId
    //   }
    //   const findReader = readers.find(foundReaderFunc)

    //   return findReader === null;

    // }
    // const unmatch = loans.filter(unmatchLoan).length

    function buildReaderReport(reader) {

        const { id, profile } = reader
        // function filterLoanIdFunc(loan) {
        //   return loan.readerId === id;
        // }
        // const loanAndReaderIds = loans.filter(filterLoanIdFunc);

        // function readerActiveLoansFunc(loan) {
        //   return loan.status !== "returned";
        // }
        // const readerActiveLoans = loanRows.filter(readerActiveLoansFunc)

        // let activeLoansForReaders = [];
        // for (let i = 0; i < loanAndReaderIds.length; i++) {
        //   for (let j = 0; j < readerActiveLoans.length; j++) {
        //     if (loanAndReaderIds[i].id === readerActiveLoans[j].loanId)
        //       activeLoansForReaders.push(readerActiveLoans[j])
        //   }
        // }
        function activeLoansByUserFilter(loanRow) {
            function findLoanByIdFunc(loan) {
                return loan.id === loanRow.loanId
            }
            const findLoanById = loans.find(findLoanByIdFunc)
            return loanRow.status !== "returned" && id === findLoanById.readerId;
        }
        const activeLoansForReaders = loanRows.filter(activeLoansByUserFilter)



        const activeLoansForReaderCount = activeLoansForReaders.length;
        function readeroverdueLoanFunc(loan) {
            return loan.status === "overdue";
        }
        const readeroverdueLoans = activeLoansForReaders.filter(readeroverdueLoanFunc)
        const overdueCount = readeroverdueLoans.length;

        function readerTotalOverdueFunc(prevValue, currentValue) {
            return prevValue + currentValue.overdueDays;
        }
        const totalOverdueDaysLoans = readeroverdueLoans.reduce(readerTotalOverdueFunc, 0);

        const readerObj = {
            readerId: id,
            readerLabel: profile?.displayName,
            activeCount: activeLoansForReaderCount,
            overdueCount,
            totalOverdueDays: totalOverdueDaysLoans
        }

        return readerObj;
    }

    const byReader = readers.map(buildReaderReport);

    return libraryReport = {
        loanCount,
        activeCount,
        overdueCount,
        totalOverdueDays,
        unmatchedReaderLoanCount,
        mostOverdueLoanId,
        byReader
    };

}

const result = buildLibraryReport(libraryData);
console.log(result)


console.log("-----------------------------------Q3-----------------------------------");


function prepareReminderRequest(data, loanId) {

    const { books, readers, loans } = data;

    function checkLoanId(loan) {
        return loan.id === loanId;
    }
    const findLoanId = loans.find(checkLoanId)
    if (!findLoanId) {
        return null + " - loan not found";
    }

    if (findLoanId.returned !== false) {
        return null + " - already returned";

    }

    function findBookById(book) {
        return book.id === findLoanId.bookId
    }
    const findBook = books.find(findBookById)

    if (!findBook) {
        return null + "- book not found";
    }

    const delayLoan = findLoanId.elapsedDays - findBook?.policy?.loanDays;

    let isDelay = null;

    if (delayLoan > 0) {
        isDelay = true;
    }

    if (!isDelay) {
        return null + " - not overdue";
    }

    function findReaderById(reader) {
        return reader.id === findLoanId.readerId;
    }
    const findReader = readers.find(findReaderById)

    if (!findReader) {
        return null + " - reader not found"
    }

    if (!findReader?.contact?.email) {
        return null + " - no email ";

    }

    const newLoanObj = {
        ...findLoanId,
        reminder: {
            ...findLoanId.reminder,
            requested: true
        }
    }
    return newLoanObj



}
// console.log("L1: ");
// console.log(prepareReminderRequest(libraryData, "L1"))
// console.log("L2: ");
// console.log(prepareReminderRequest(libraryData, "L2"))
// console.log("L3: ");
// console.log(prepareReminderRequest(libraryData, "L3"))
// console.log("L4: ");
// console.log(prepareReminderRequest(libraryData, "L4"))
// console.log("L5: ");
// console.log(prepareReminderRequest(libraryData, "L5"))
// console.log("L6: ");
// console.log(prepareReminderRequest(libraryData, "L6"))


for (let i = 1; i < 7; i++) {
    const id = "L" + i
    console.log(id + ":");
    console.log(prepareReminderRequest(libraryData, id));
}
console.log("L99: ");
console.log(prepareReminderRequest(libraryData, "L99"))