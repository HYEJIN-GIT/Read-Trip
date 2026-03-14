import {searchBooks} from "./api.js"


const userValue = document.getElementById('user-value')
const button = document.getElementById('btn')
const recommend = ["해리포터","민음사","안전가옥","히가시노 게이고","한강","프로젝트 헤일메리"]
const text =  document.querySelector('.search-text h4')
let bookList = []


// 버튼 클릭 이벤트
// button.addEventListener('click',(event)=>{
//   text.textContent = "검색 결과"
//     event.preventDefault()
//     getSearchBooks()
// })

userValue.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        text.textContent = "검색 결과"
        event.preventDefault()
        getSearchBooks()
    }
     
})

const getSearchBooks = async ()=>{
    let keyword = userValue.value.trim()
    let data = await searchBooks(keyword)
    bookList = data.documents
    console.log(data)
    render()
}

// 추천 키워드 렌더
const recommendRender = ()=>{
    let recommendHTML = `
    <h3 class="recommend-keyword">추천 키워드</h3>
    <div class="recommend-list">
      ${recommend.map(item => `
        <div class="recommend-books">
          ${item}
        </div>
      `).join('')}
    </div>
    `
    document.getElementById('recommend-render').innerHTML = recommendHTML
    document.querySelectorAll('.recommend-books').forEach(div=>
        div.addEventListener('click',
          ()=>{
            userValue.value = div.textContent.trim()
             text.textContent = "검색 결과"
            getSearchBooks()
          }
        )
    )
}

recommendRender()



const render = ()=>{
    document.getElementById('recommend-render').innerHTML = ''
    let bookHTML = 
    ` <section class="search-book-area row ">
    ${
        bookList.map(book=>`
       
            <div class = "col-2">
              
                <img src ="${book.thumbnail}">
                 <div class="book-title">${book.title.length <10 ? book.title: book.title.slice(0,10)+"..."}</div>
                 <div class ="book-authors">${book.authors}</div>
            </div>
         
          
            
            `).join('')
    }  
    
    </section>
    `
 
    document.getElementById('book-render').innerHTML = bookHTML
}