import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { LibraryService } from './domain/services/LibraryService';
import { initialBooks } from './domain/entities/Book';
import { initialMembers } from './domain/entities/Member';

const app = express();
app.use(express.json());

const libraryService = new LibraryService(initialBooks, initialMembers);

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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