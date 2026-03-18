const LS_key = "book"


export function getBooks(){
    const data = localStorage.getItem(LS_key)
    return data ? JSON.parse(data) : [];
}

export function addBooks(book) {
    const books = getBooks();
  
    const newBooks = {
      id: Date.now(), // 간단한 id 생성
      ...book,
    };
  
   books.push(newBooks);
  
    localStorage.setItem(LS_key, JSON.stringify(books));
  
    return newBooks;
  }


