import { getBooks, getTotalBooks, goalBooks } from "./storage.js";

const recentBooks = getBooks();

// 최근 추가한 책 렌더
const recentBooksRender = () => {
    const recentBookList = recentBooks.slice(0,5).reverse();
    const html = `
    <div class="recent-content">
        <h4>최근 추가한 책</h4>
        <a href="library.html" class="btn-more">전체 내 서재 보기</a>
    </div>
    <div class="recent-book">
        ${recentBookList.map(book => `
        <div class="book-card">
            <img src="${book.thumbnail}" alt="${book.title}">
            <div class="recent-title">${book.title.length <10 ? book.title : book.title.slice(0,10)+"..."}</div>
            <div class="book-authors">${book.authors}</div>
        </div>`).join('')}
    </div>
    `;
    document.getElementById('register').innerHTML = html;
}
recentBooksRender();


// 읽은 책 / 읽는 책 / 총 등록 책, 프로그래스바
const readDone = () => {
    const done = recentBooks.filter(item => item.state === "done");
    const reading = recentBooks.filter(item => item.state === "reading");


    document.getElementById('read-done').textContent = `다 읽은 책 : ${done.length} 권`;
    document.getElementById('read-plan').textContent = `읽고 있는 책 : ${reading.length} 권`;

    const totalRead = document.getElementById('total-read')




    const MonthGoalRender = (value) => {
        const goalHTML = `
        목표 : ${value}권 / ${reading.length}권
        `
        document.getElementById('goal').innerHTML = goalHTML

        if(value === reading.length){
            document.getElementById('goal').innerHTML = `
            <p> 목표 : ${value}권 / ${reading.length}권</p> 
            <p>이번달 목표에 달성 했습니다 !</p> 
            `
        }
    }


    const saved = getTotalBooks()
    if(saved){
        MonthGoalRender(saved)
    }

   
    totalRead.addEventListener('keydown',(event)=>{
        if(event.key === "Enter"){
            event.preventDefault()

            const value = Number(totalRead.value) || 0

            goalBooks(value)        // 저장
            MonthGoalRender(value)  // 화면 반영

            totalRead.value = ""    // 입력창 초기화
        }
    })
}

readDone();