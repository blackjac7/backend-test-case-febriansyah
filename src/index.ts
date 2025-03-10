import express from "express";
import swaggerUi from "swagger-ui-express";
import { LibraryService } from "./domain/services/LibraryService";
import { initialBooks } from "./domain/entities/Book";
import { initialMembers } from "./domain/entities/Member";

const app = express();
app.use(express.json());

const libraryService = new LibraryService(initialBooks, initialMembers);

// Swagger setup
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Library API",
    version: "1.0.0",
    description: "API for library management system",
  },
  paths: {
    "/books": {
      get: {
        summary: "Get all available books",
        responses: {
          "200": {
            description: "List of available books",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      title: { type: "string" },
                      author: { type: "string" },
                      stock: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/members": {
      get: {
        summary: "Get all members status",
        responses: {
          "200": {
            description: "List of members and their status",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      name: { type: "string" },
                      borrowedBooks: { type: "number" },
                      penalized: { type: "boolean" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/borrow": {
      post: {
        summary: "Borrow a book",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  memberCode: { type: "string" },
                  bookCode: { type: "string" },
                },
                required: ["memberCode", "bookCode"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Book borrowed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/return": {
      post: {
        summary: "Return a book",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  memberCode: { type: "string" },
                  bookCode: { type: "string" },
                },
                required: ["memberCode", "bookCode"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Book returned successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get("/books", (req, res) => {
  res.json(libraryService.getAvailableBooks());
});

app.get("/members", (req, res) => {
  res.json(libraryService.getMembersStatus());
});

app.post("/borrow", (req, res) => {
  const { memberCode, bookCode } = req.body;
  const success = libraryService.borrowBook(memberCode, bookCode);
  res.json({ success });
});

app.post("/return", (req, res) => {
  const { memberCode, bookCode } = req.body;
  const success = libraryService.returnBook(memberCode, bookCode, new Date());
  res.json({ success });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
