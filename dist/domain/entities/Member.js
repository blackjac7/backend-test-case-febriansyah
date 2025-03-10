"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialMembers = exports.Member = void 0;
class Member {
    constructor(code, name, borrowedBooks = [], penaltyEndDate = null) {
        this.code = code;
        this.name = name;
        this.borrowedBooks = borrowedBooks;
        this.penaltyEndDate = penaltyEndDate;
    }
    canBorrow() {
        if (this.penaltyEndDate && this.penaltyEndDate > new Date()) {
            return false;
        }
        return this.borrowedBooks.length < 2;
    }
}
exports.Member = Member;
exports.initialMembers = [
    {
        code: "M001",
        name: "Angga",
        borrowedBooks: [],
        penaltyEndDate: null,
        canBorrow: function () {
            throw new Error("Function not implemented.");
        },
    },
    {
        code: "M002",
        name: "Ferry",
        borrowedBooks: [],
        penaltyEndDate: null,
        canBorrow: function () {
            throw new Error("Function not implemented.");
        },
    },
    {
        code: "M003",
        name: "Putri",
        borrowedBooks: [],
        penaltyEndDate: null,
        canBorrow: function () {
            throw new Error("Function not implemented.");
        },
    },
];
