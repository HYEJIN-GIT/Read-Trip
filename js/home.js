import {bestSellBooks} from "./api.js"


let bestBookList = []
let start = 0



const getBestSell = async ()=>{
    let data = await bestSellBooks()
    bestBookList = data.documents
    console.log(bestBookList)
    render()
}

getBestSell()




const render = ()=>{
  

  

 
    let bookHTML = 

    
    `
    <section class="best-area row ">
 소설 베스트 셀러
    <div class= "best-section">
     <div id="left"><i class="fa-solid fa-angle-left"></i></div>
    ${
        bestBookList.slice(start, start+5).map(item=>`
       
            <div class = "col-2">
              
                <img src ="${item.thumbnail}">
                 <div class="book-title">${item.title.length <10 ? item.title: item.title.slice(0,10)+"..."}</div>
                 <div class ="book-authors">${item.authors}</div>
            </div>
         
          
            
            `).join('')
    }  
    <div id = "right"><i class="fa-solid fa-angle-right"></i></div>
    </div>
   
    
    </section>
    `
    document.getElementById('best-novel').innerHTML = bookHTML



    
document.getElementById('left').addEventListener("click",()=>{
    if(start>0){
        start -=5
       }
render()

})


document.getElementById('right').addEventListener('click',()=>{
    if(start+5<bestBookList.length)
        {
         start+=5
         
        }
   
    render()
})
}





