# Backend Test and Algorithm Solutions

This project implements a library management system and algorithm solutions using Express.js with TypeScript, following Domain-Driven Design (DDD) principles.

## Project Structure

```
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── Book.ts
│   │   │   └── Member.ts
│   │   └── services/
│   │       └── LibraryService.ts
│   ├── algorithms/
│   │   ├── solutions.ts
│   │   └── solutions.test.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Backend Test Case Implementation

### Features

- Library management system with book borrowing and returning functionality
- Member management with penalty system
- Book inventory tracking
- RESTful API with Swagger documentation
- Domain-Driven Design architecture
- TypeScript implementation

### API Endpoints

1. **GET /books**
   - Returns list of available books
   - Books being borrowed are not included in the count

2. **GET /members**
   - Returns list of all members
   - Shows number of books currently borrowed by each member
   - Indicates if member is under penalty

3. **POST /borrow**
   - Endpoint for borrowing books
   - Request body:
     ```json
     {
       "memberCode": "M001",
       "bookCode": "JK-45"
     }
     ```
   - Conditions:
     - Members cannot borrow more than 2 books
     - Books must be available (not borrowed by others)
     - Member must not be under penalty

4. **POST /return**
   - Endpoint for returning books
   - Request body:
     ```json
     {
       "memberCode": "M001",
       "bookCode": "JK-45"
     }
     ```
   - Conditions:
     - Book must have been borrowed by the member
     - Late returns (> 7 days) result in 3-day penalty

### Swagger Documentation

API documentation is available at `/api-docs` when the server is running.

## Algorithm Solutions

### 1. String Reversal
- Reverses alphabetic characters while maintaining numbers at their positions
- Example: "NEGIE1" → "EIGEN1"

### 2. Longest Word Finder
- Finds the longest word in a given sentence
- Example: "Saya sangat senang mengerjakan soal algoritma" → "mengerjakan"

### 3. Query Occurrence Counter
- Counts occurrences of query strings in an input array
- Example:
  ```typescript
  INPUT = ['xc', 'dz', 'bbb', 'dz']
  QUERY = ['bbb', 'ac', 'dz']
  OUTPUT = [1, 0, 2]
  ```

### 4. Matrix Diagonal Difference
- Calculates the absolute difference between matrix diagonals
- Example:
  ```typescript
  Matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
  ]
  Result = |(1 + 5 + 9) - (0 + 5 + 7)| = |15 - 12| = 3
  ```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Run built JavaScript
- `npm test`: Run unit tests
- `npm run swagger-autogen`: Generate Swagger documentation

## Requirements

- Node.js
- TypeScript
- Express.js
- Jest for testing
- Swagger UI Express for API documentation