"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const LibraryService_1 = require("./domain/services/LibraryService");
const Book_1 = require("./domain/entities/Book");
const Member_1 = require("./domain/entities/Member");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const libraryService = new LibraryService_1.LibraryService(Book_1.initialBooks, Member_1.initialMembers);
// Swagger setup
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Library API',
        version: '1.0.0',
        description: 'API for library management system'
    },
    paths: {
        '/books': {
            get: {
                summary: 'Get all available books',
                responses: {
                    '200': {
                        description: 'List of available books'
                    }
                }
            }
        },
        '/members': {
            get: {
                summary: 'Get all members status',
                responses: {
                    '200': {
                        description: 'List of members and their status'
                    }
                }
            }
        }
    }
};
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Routes
app.get('/books', (req, res) => {
    res.json(libraryService.getAvailableBooks());
});
app.get('/members', (req, res) => {
    res.json(libraryService.getMembersStatus());
});
app.post('/borrow', (req, res) => {
    const { memberCode, bookCode } = req.body;
    const success = libraryService.borrowBook(memberCode, bookCode);
    res.json({ success });
});
app.post('/return', (req, res) => {
    const { memberCode, bookCode } = req.body;
    const success = libraryService.returnBook(memberCode, bookCode, new Date());
    res.json({ success });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
