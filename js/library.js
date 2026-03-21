import { getBooks, deleteBooks, updateState} from "./storage.js";


let mode = "hope"
const tabs = document.querySelectorAll('.tabs div')

tabs.forEach(item=>{
    item.addEventListener('click',(event)=>{
        moveToTabs(event)
    })
})

const render = ()=>{
let bookList = getBooks()
let list  = []

if(mode === "hope"){           // 전체
    list = bookList
} else if(mode === "done"){    // 다 읽은 책만
    list = bookList.filter(item => item.state === "done")
} else if(mode === "reading"){ // 읽는 중인 책
    list = bookList.filter(item => item.state === "reading")
}
let libraryHTML =

list.map(item=>`
    <div>${item.title}</div>
    <img src="${item.thumbnail}">
    <button class = "delete" data-id="${item.isbn}" >삭제</button></button>
     <button class = "update" data-id="${item.isbn}" >다 읽음</button></button>
    `).join('')

    document.getElementById('list-render').innerHTML = libraryHTML
    document.querySelectorAll('.delete').forEach(
        item=>item.addEventListener('click',()=>{
            let id = item.dataset.id
            console.log("id:", id)
            deleteBooks(id)
            render()
        })
    )
    document.querySelectorAll('.update').forEach(item=>
        item.addEventListener('click',()=>{
            let id = item.dataset.id
            console.log("id:", id)
             updateState(id)
            render()
        }))
    
}
render()


const moveToTabs = (event)=>{
   mode =  event.target.id
   tabs.forEach(item=>item.classList.remove('active'))
   event.target.classList.add('active')
   render()
}