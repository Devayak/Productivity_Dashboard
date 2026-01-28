//! navigation to other page  functionalisties
function openFeatures() {
  let elems = document.querySelectorAll(".elem");
  let fullElems = document.querySelectorAll(".fullElems");
  let back = document.querySelectorAll(".fullElems .back");

  //? to open indivisual pages
  elems.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElems[elem.id].style.display = "block";
    });
  });

  //?back btn logic
  back.forEach((elem) => {
    elem.addEventListener("click", (backelem) => {
      console.log(elem.id);
      fullElems[elem.id].style.display = "none";
    });
  });
}
openFeatures();

//! to do list functionalisties
function todoList() {
  const checkBox = document.querySelector(".todoForm #imp input");

  console.log(checkBox);
  checkBox.addEventListener("change", () => {
    currentTask[index].imp = checkBox.checked;
  });

  const taskList = document.querySelector(".taskList");

  var currentTask = [];
  function storage() {
      const data = localStorage.getItem("currentTask");
    if (!data) {
      console.log("list is empty");
        taskList.innerText = "Need to add task";
    } else {
      currentTask = JSON.parse(data);
      console.log("full");
    
    }
  }
  storage();

  const form = document.querySelector(".todoForm");
  const input = document.querySelector(".todoForm input");
  const textarea = document.querySelector(".todoForm textarea");
  const imp = document.querySelector(".imp");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(input.value, textarea.value);
    console.log(currentTask);
    currentTask.push({
      task: input.value,
      des: textarea.value,
      imp: checkBox.checked,
    });

    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    renderTaxk();
    //     checkBox.checked=false;
    // input.value=''
    // textarea.value=''

    //or

    form.reset();
  });

  const renderTaxk = () => {
    let sum = "";
    currentTask.forEach((ele, idx) => {
      console.log("hello");
      console.log(ele.task);
      sum += ` <div class="taskInfo">
        <div>
            <h4>${ele.task}</h4>
        <p style="margin-bottom: 20px;">${ele.des}</p>
      <span class="imp" style="display:${ele.imp ? "block" : "none"}">
            important!
          </span>
        </div>
        <div ><button class="status" id=${idx}>Mark as Completed</button></div>
      </div>`;
    });
    taskList.innerHTML = sum;

    //? delete functionality-----❌

    document.querySelectorAll(".taskInfo button").forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log(currentTask.splice(btn.id, 1));
            localStorage.setItem("currentTask", JSON.stringify(currentTask));
        renderTaxk();
      });
    });
  };
  renderTaxk();
}

todoList();


//! daily planner
function dayPlanner(){

// func to get todays date

  function getToday(){
  let date=new Date().toISOString().split("T")[0];
  return  date
}             
let today=getToday();
console.log(today);





function dailyPlanner(){
  const PlanDay=document.querySelector('.PlanDay')

let hour=Array.from({length:18},(ele,idx)=>{
    return `${6+idx }:00 - ${7+idx}:00`;
})

let storeData=JSON.parse(localStorage.getItem('dailyTask'))
console.log(storeData.date);

// code to check if the todays date is same as the stored date or not

if(storeData.date != today){
  dailyTask={date:today}
  localStorage.setItem('dailyTask',JSON.stringify(dailyTask))
}





let hourSum=''
let data=JSON.parse(localStorage.getItem('dailyTask'))||[]
console.log(data);
    console.log(data);
hour.forEach((elem,idx)=>{
    // console.log(elem);
   var savedData=data[idx]||''
    hourSum+=` <div class="pllaner-time">
                       <p>${elem}</p>
                       <input id=${idx} type="text" placeholder="...." value=${savedData}>
                    
                </div>`
})


PlanDay.innerHTML=hourSum
var dailyTask={date:today}
let planner_time=document.querySelectorAll('.pllaner-time input')
planner_time.forEach((ele)=>{
    ele.addEventListener('change',()=>{
        console.log(ele.id);
       dailyTask[ele.id]=ele.value
       localStorage.setItem('dailyTask',JSON.stringify(dailyTask)) // add task to the localStorage
    })
})
}

dailyPlanner()
}

dayPlanner()

//! motivation quote fetch function
function motivation(){
  let p=document.querySelector('.motivation .quoteBox p')
let Author=document.querySelector('.motivation .quoteBox h4')
console.log(p);

async function randomQuotes(){
 try {
   p.textContent = "Loading..."
  const res = await fetch('https://dummyjson.com/quotes')
  let data=await res.json()
  console.log(data);
  const randomIndex = Math.floor(Math.random() * data.quotes.length)
  p.innerText = data.quotes[randomIndex].quote
  Author.innerText=data.quotes[randomIndex].author
  
 } catch (error) {
  console.log(error);
  
 }
  
}
randomQuotes()

}
motivation()


//! promodo Timer function
const promodoTimer=()=>{
let timer=document.querySelector(".timer")
let timeDisplay=document.querySelector(".timeDisplay")
let startBtn=document.querySelector(".promoTimer .timer .controls #startBtn")
let pauseBtn=document.querySelector(".promoTimer .timer .controls #pauseBtn")
let resetBtn=document.querySelector(".promoTimer .timer .controls #resetBtn")
let workSession=true;

console.log(timer);

let WORK_TIME=30*60;
let BREAK_TIME=5*60;
let totalSecond=WORK_TIME;


let timerId=null


 let min=Math.floor(totalSecond/60)
  let sec= totalSecond%60;
   timeDisplay.innerHTML=`${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
   let minCopy=min;
   let secCopy=sec;
  // if(workSession==true){
  //   let min=Math.floor(WORK_TIME/60)
  // let sec=WORK_TIME%60;
  // workSession=!workSession
  // }else{
  //    let min=Math.floor(BREAK_TIME/60)
  // let sec=BREAK_TIME%60;
  // }
  // console.log(workSession=!workSession);
  // let totalSecond=workSession?WORK_TIME:BREAK_TIME;
  // console.log(totalSecond);

const updateTimer=()=>{
  if(totalSecond>0){
    totalSecond--
  }else{
    clearInterval(timerId)
    timerId=null;
    workSession=!workSession;
    totalSecond=workSession?WORK_TIME:BREAK_TIME;
    
  }

  if(totalSecond==WORK_TIME){
      timer.style.backgroundColor =='pink'
    }
  console.log(workSession ? "WORK" : "BREAK", totalSecond);


  min=Math.floor(totalSecond/60)
  sec=totalSecond%60;
  timeDisplay.innerHTML=`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}



startBtn.addEventListener('click', () => {
  if (timerId) return; 

  timerId = setInterval(updateTimer, 1000);
});





pauseBtn.addEventListener('click',()=>{
  clearInterval(timerId)
  timerId=null;
})

resetBtn.addEventListener('click',()=>{
  clearInterval(timerId)
  timerId=null
   totalSecond = minCopy * 60 + secCopy;
   let min=Math.floor(totalSecond/60);
   let sec=totalSecond%60

  timeDisplay.innerHTML =`${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    
})
console.log(WORK_TIME);
console.log(startBtn);

console.log(WORK_TIME);


}





promodoTimer()