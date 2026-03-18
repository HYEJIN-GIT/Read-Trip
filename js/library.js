import { addBooks, getBooks } from "./storage.js";

const book = getBooks()
console.log(book)




const render = ()=>{


    let listHTML = book.map((item)=>`
    <div>${item.title}</div>
    <img src = "${item.thumbnail}">
    <button class = "complete" data-id = "${item.id}">다 읽음</button>
    <button>읽기 시작</button>
    `).join('')

    document.getElementById('list-render').innerHTML = listHTML

    const button = document.querySelectorAll('.complete')
    button.forEach(item => {
        item.addEventListener('click',()=>{

          let data = event.target.dataset.id 
          data = Number(data)
            updateBooks(data)





        })
        
    });
}

render()
const updateBooks=(id)=>{
    let bookList = getBooks()
    let findBook = bookList.find(
        item=>
        item.id === id
    )
    findBook.status = "done"

    localStorage.setItem("book",JSON.stringify(bookList))
    console.log(findBook,bookList)
    
}
