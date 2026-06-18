-- 1. CREATE TABLE
CREATE TABLE books (
    book_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT,
    price REAL NOT NULL,
    published_year INTEGER
);


-- 2. INSERT DATA
INSERT INTO books (book_id, title, author, category, price, published_year)
VALUES
(1, 'Atomic Habits', 'James Clear', 'Self Help', 399.00, 2018),
(2, 'The Alchemist', 'Paulo Coelho', 'Fiction', 299.00, 1988),
(3, 'Clean Code', 'Robert C. Martin', 'Programming', 799.00, 2008),
(4, 'Python Crash Course', 'Eric Matthes', 'Programming', 699.00, 2019),
(5, 'Rich Dad Poor Dad', 'Robert Kiyosaki', 'Finance', 350.00, 1997);


-- 3. SELECT ALL BOOKS
SELECT * FROM books;


-- 4. SELECT SPECIFIC COLUMNS
SELECT title, author, price
FROM books;


-- 5. WHERE CONDITION
SELECT * FROM books
WHERE category = 'Programming';


-- 6. ORDER BY PRICE
SELECT * FROM books
ORDER BY price DESC;


-- 7. LIMIT RESULT
SELECT * FROM books
LIMIT 3;


-- 8. UPDATE BOOK PRICE
UPDATE books
SET price = 749.00
WHERE book_id = 4;


-- 9. DELETE A BOOK
DELETE FROM books
WHERE book_id = 5;


-- 10. FINAL TABLE VIEW
SELECT * FROM books;