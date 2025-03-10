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
  {
    code: "M001",
    name: "Angga",
    borrowedBooks: [],
    penaltyEndDate: null
  },
  {
    code: "M002",
    name: "Ferry",
    borrowedBooks: [],
    penaltyEndDate: null
  },
  {
    code: "M003",
    name: "Putri",
    borrowedBooks: [],
    penaltyEndDate: null
  }
];