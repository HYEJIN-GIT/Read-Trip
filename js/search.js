import {searchBooks} from "./api.js"
import { addBooks } from "./storage.js"


const recommendKeyword = ["민음사","해리포터","세계문학전집","히가시노 게이고","프로젝트 헤일메리","안전가옥"]
const userValue = document.getElementById('user-value')
let bookList = []
let page = 1
let totalResults = 0
const size = 10
const groupSize = 5


userValue.addEventListener("keydown",(event)=>{
  if(event.key === "Enter"){
 
    event.preventDefault()
    page = 1 
    getSearchBooks()
    
  }
})


const getSearchBooks = async ()=>{

let keyword = userValue.value.trim()
let data = await searchBooks(keyword,page)

bookList = data.documents
totalResults = data.meta.total_count
console.log(bookList)
render()
paginationRender()
}


// 추천 키워드 렌더

const recommendRender = ()=>{
  let recommendHTML  = `
  <h2>추천키워드</h2>
  <div class ="recommend-list">
 
  ${
    recommendKeyword.map(item=>`
  
        <div class= "recommend-books">${item}</div>

    
      `).join('')
  }
   </div>
  `

  document.getElementById('recommend-render').innerHTML = recommendHTML
  let recommendBtn = document.querySelectorAll('.recommend-books')
  recommendBtn.forEach(item=>
    item.addEventListener('click',()=>{
      
      userValue.value = item.textContent.trim()
      page = 1 
      getSearchBooks()
    })
  )
}
recommendRender()


const render = ()=>{
  let bookHTML = `<section class="search-book-area row ">
      ${
          bookList.map(book=>`
         
              <div class = "col-2">
            
                  <button  class= "plus-book" data-id="${book.isbn}">책 추가</button>
                  <img src ="${book.thumbnail}">
                   <div class="book-title">${book.title.length <10 ? book.title: book.title.slice(0,10)+"..."}</div>
                   <div class ="book-authors">${book.authors}</div>
              </div>
           
            
              
              `).join('')
      }  
      
      </section>
      `

  document.getElementById('book-render').innerHTML = bookHTML
  document.querySelectorAll('.plus-book').forEach(
    item=> 
      item.addEventListener('click',()=>{
      
     
      const isbn = item.dataset.id
      console.log(isbn)
      let plusBooks = bookList.find(id => id.isbn === isbn)
      addBooks(plusBooks)
    

      })
    
  )
}


//페이지네이션 렌더

const paginationRender = ()=>{

  let totalPage = Math.ceil(totalResults/size)
  let pageGroup = Math.ceil(page/groupSize)
  let lastPage = pageGroup * groupSize
  if(lastPage>totalPage){
    lastPage = totalPage
  }
  let firstPage = lastPage - (groupSize-1) < 1 ? 1 : lastPage - (groupSize-1)
 
  console.log(totalPage,pageGroup,lastPage,firstPage)

    let paginationHTML = ``
    if(page>1){
paginationHTML =` <li class="page-item"><a class="page-link ">&lt;&lt;</a></li>
 <li class="page-item"><a class="page-link ">&lt;</a></li>`
    }
    
   
    
    for(let i=firstPage;i<=lastPage;i++){
      paginationHTML+= ` <li class="page-item ${i===page?"active":""}"><a class="page-link ">${i}</a></li>`
    }

    if(page<totalPage){
 paginationHTML+=` <li class="page-item"><a class="page-link ">&gt;</a></li>
 <li class="page-item"><a class="page-link ">&gt;&gt;</a></li>`
    }
   
    
    document.querySelector('.pagination').innerHTML = paginationHTML

  
    // 버튼 클릭 시 페이지 이동
    let moveToPage = document.querySelectorAll('.page-link')

    moveToPage.forEach(item =>

     

      item.addEventListener('click',()=>{
       
        let num = item.textContent
      
        if(item.textContent === "<"){
   
            pageNum(--page)

          }else if(item.textContent === "<<"){
   
            pageNum(1)

          } 
          
          
          else if(item.textContent === ">"){
            console.log(page++)
            pageNum(page++)
          }else if(item.textContent === ">>"){
            pageNum(totalPage)
          }
          

          else{
            num = Number(num)
            pageNum(num)
          }
       

      
      })
    )

   


}


const pageNum = (num)=>{
  page = num
  getSearchBooks()
}