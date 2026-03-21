// const LS_key = "book"


// export function getBooks(){
//     const data = localStorage.getItem(LS_key)
//     return data ? JSON.parse(data) : [];
// }

// export function addBooks(book) {
//     const books = getBooks();
  
//     const newBooks = {
//       id: Date.now(), // 간단한 id 생성
//       ...book,
//     };
  
//    books.push(newBooks);
  
//     localStorage.setItem(LS_key, JSON.stringify(books));
  
//     return newBooks;
//   }







const LS = "book" //키값

export function getBooks(){

    let data = localStorage.getItem(LS) // 로컬의 키 값으로 값이 있는지 부르기!
    
    return data ?JSON.parse(data) :[] // 값이 없으면 []로 반환
    
}


export function addBooks(book){ //book라는 매개변수 받기 (객체라던가?-헷갈려)

    let books = getBooks()

    let newBook = {
        ...book,
        state:"reading"
    
     
    }
    books.push(newBook)
    localStorage.setItem(LS,JSON.stringify(books))
    return newBook


}

export function deleteBooks (id){
    let books = getBooks()
    const filtered = books.filter(item=>{
        return String(item.isbn) !== String(id)
    }
      
    )
 
    localStorage.setItem(LS, JSON.stringify(filtered));
}

export function updateState(id){
    let books = getBooks()
    const updatedBooks = books.map(item => {
        if(String(item.isbn) === String(id)){
            return {...item, state: "done"}
        }
        return item
    })
    localStorage.setItem(LS, JSON.stringify(updatedBooks))
}