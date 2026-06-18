from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Field

app = FastAPI(
    title="📚 Bookstore Management API",
    version="1.0.0",
    description="""
## Welcome to Bookstore Management API

This is a simple and professional REST API built using **FastAPI**.

### Features
- View all books
- Get a single book by ID
- Add a new book
- Update book details
- Delete a book

### Technologies Used
- Python
- FastAPI
- Pydantic
- Swagger UI
""",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BookCreate(BaseModel):
    title: str = Field(..., min_length=2, example="Atomic Habits")
    author: str = Field(..., min_length=2, example="James Clear")
    price: float = Field(..., gt=0, example=399)


books = [
    {
        "id": 1,
        "title": "Atomic Habits",
        "author": "James Clear",
        "price": 399,
    },
    {
        "id": 2,
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "price": 299,
    },
]

next_id = 3


@app.get("/", include_in_schema=False)
def home():
    return RedirectResponse(url="/docs")


@app.get("/books", tags=["Books"])
def get_books():
    return {
        "message": "Books fetched successfully",
        "total_books": len(books),
        "books": books,
    }


@app.get("/books/{book_id}", tags=["Books"])
def get_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            return {
                "message": "Book fetched successfully",
                "book": book,
            }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Book not found",
    )


@app.post("/books", status_code=status.HTTP_201_CREATED, tags=["Books"])
def add_book(book: BookCreate):
    global next_id

    new_book = {
        "id": next_id,
        "title": book.title,
        "author": book.author,
        "price": book.price,
    }

    books.append(new_book)
    next_id += 1

    return {
        "message": "Book added successfully",
        "book": new_book,
    }


@app.put("/books/{book_id}", tags=["Books"])
def update_book(book_id: int, updated_book: BookCreate):
    for book in books:
        if book["id"] == book_id:
            book["title"] = updated_book.title
            book["author"] = updated_book.author
            book["price"] = updated_book.price

            return {
                "message": "Book updated successfully",
                "book": book,
            }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Book not found",
    )


@app.delete("/books/{book_id}", tags=["Books"])
def delete_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            books.remove(book)

            return {
                "message": "Book deleted successfully",
            }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Book not found",
    )