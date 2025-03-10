export class Member {
  constructor(
    public code: string,
    public name: string,
    public borrowedBooks: string[] = [],
    public penaltyEndDate: Date | null = null
  ) {}

  canBorrow(): boolean {
    if (this.penaltyEndDate && this.penaltyEndDate > new Date()) {
      return false;
    }
    return this.borrowedBooks.length < 2;
  }
}

export const initialMembers: Member[] = [
  new Member("M001", "Angga"),
  new Member("M002", "Ferry"),
  new Member("M003", "Putri"),
];
