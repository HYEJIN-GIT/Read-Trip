import {bestSellBooks} from "./api.js"

let bestBookList =[]

const getBestSell = async ()=>{
   let data = await bestSellBooks()
   bestBookList = data.documents
    
    console.log(bestBookList)
    render()
}
getBestSell()

const render = ()=>
{
    let bestHTML = 
    
    `<section class ="search-book-area row">
    ${
        bestBookList.map(best=>

            `
            
                <div class = "col-2">
                  
                    <img src ="${best.thumbnail}">
                     <div class="book-title">${best.title.length <10 ? best.title: best.title.slice(0,10)+"..."}</div>
                     <div class ="book-authors">${best.authors}</div>
                </div>
            `
        ).join('')
    }
    
    
    </section>`
  
    document.getElementById('best-sell').innerHTML = bestHTML
}