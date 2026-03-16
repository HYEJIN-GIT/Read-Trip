import {searchBooks} from "./api.js"


const userValue = document.getElementById('user-value')
// const button = document.getElementById('btn')
const recommend = ["해리포터","민음사","안전가옥","히가시노 게이고","한강","프로젝트 헤일메리"]
const text =  document.querySelector('.search-text h4')
let bookList = []
let page = 1
let totalResult = 0
const size = 10
const groupSize = 5


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
    let data = await searchBooks(keyword,page)
    console.log("요청 페이지", page)
    bookList = data.documents
    totalResult = data.meta.total_count
    console.log(data)
    render()
    paginationRender()
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



// 페이지네이션 렌더

const paginationRender = ()=>{
  let totalPage = Math.ceil(totalResult/size)
  let pageGroup = Math.ceil(page/groupSize)
  let lastPage = pageGroup*groupSize
  if(lastPage>totalPage){
    lastPage=totalPage
  }
  let firstPage = lastPage -(groupSize-1) < 1? 1 : lastPage -(groupSize-1)
  console.log(lastPage,firstPage)



  let paginationHTML = ``
if(page>1){
  paginationHTML=`
  <li class="page-item"><a class=" page-link prev">&lt;&lt;</a></li>
  <li class="page-item"><a class=" page-link prev">&lt;</a></li>`
  
}

  for(let i =firstPage;i<=lastPage;i++){
    paginationHTML+= `
   
    <li class="page-item ${i===page?"active":""}"><a class="page-link">${i}</a></li>
  `
  }
  if(page<totalPage){
paginationHTML+=`<li class="page-item"><a class=" page-link prev">&gt;</a></li>
  <li class="page-item"><a class=" page-link prev">&gt;&gt;</a></li>`
  }
  

  document.querySelector('.pagination').innerHTML = paginationHTML
  

  moveToPage(totalPage)


}

const  moveToPage = (totalPage) => {

  const buttons = document.querySelectorAll(".page-link")

  buttons.forEach((btn)=>{

    btn.addEventListener("click",()=>{

      let text = btn.textContent

      // 이전 버튼
      if(text === "<<"){
        page =1
      } else if(text === "<"){
        if(page > 1){
          page--
        }

      // 다음 버튼
      }
      else if(text ===">>"){
        page = totalPage
      }     
      else if(text === ">"){
        if(page < totalPage){
          page++
        }

      // 숫자 버튼
      }else{
        page = Number(text)
      }

      getSearchBooks()

    })

  })

}