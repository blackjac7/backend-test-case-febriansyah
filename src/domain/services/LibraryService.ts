import { Book } from '../entities/Book';
import { Member } from '../entities/Member';

export class LibraryService {
  constructor(
    private books: Book[],
    private members: Member[]
  ) {}

  borrowBook(memberCode: string, bookCode: string): boolean {
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

  returnBook(memberCode: string, bookCode: string, returnDate: Date): boolean {
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

  private isBookBorrowed(bookCode: string): boolean {
    return this.members.some(member => 
      member.borrowedBooks.includes(bookCode)
    );
  }

  getAvailableBooks(): Book[] {
    return this.books.filter(book => book.stock > 0);
  }

  getMembersStatus(): any[] {
    return this.members.map(member => ({
      code: member.code,
      name: member.name,
      borrowedBooks: member.borrowedBooks.length,
      penalized: member.penaltyEndDate ? member.penaltyEndDate > new Date() : false
    }));
  }
}