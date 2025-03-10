"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryService = void 0;
class LibraryService {
    constructor(books, members) {
        this.books = books;
        this.members = members;
    }
    borrowBook(memberCode, bookCode) {
        const member = this.members.find(m => m.code === memberCode);
        const book = this.books.find(b => b.code === bookCode);
        if (!member || !book) {
            return false;
        }
        if (!member.canBorrow()) {
            return false;
        }
        if (book.stock <= 0) {
            return false;
        }
        if (this.isBookBorrowed(bookCode)) {
            return false;
        }
        member.borrowedBooks.push(bookCode);
        book.stock--;
        return true;
    }
    returnBook(memberCode, bookCode, returnDate) {
        const member = this.members.find(m => m.code === memberCode);
        const book = this.books.find(b => b.code === bookCode);
        if (!member || !book) {
            return false;
        }
        const bookIndex = member.borrowedBooks.indexOf(bookCode);
        if (bookIndex === -1) {
            return false;
        }
        // Check if book is returned after 7 days
        const borrowDate = new Date();
        borrowDate.setDate(borrowDate.getDate() - 7);
        if (returnDate > borrowDate) {
            const penaltyEndDate = new Date();
            penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
            member.penaltyEndDate = penaltyEndDate;
        }
        member.borrowedBooks.splice(bookIndex, 1);
        book.stock++;
        return true;
    }
    isBookBorrowed(bookCode) {
        return this.members.some(member => member.borrowedBooks.includes(bookCode));
    }
    getAvailableBooks() {
        return this.books.filter(book => book.stock > 0);
    }
    getMembersStatus() {
        return this.members.map(member => ({
            code: member.code,
            name: member.name,
            borrowedBooks: member.borrowedBooks.length,
            penalized: member.penaltyEndDate ? member.penaltyEndDate > new Date() : false
        }));
    }
}
exports.LibraryService = LibraryService;
