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
        currentTask.splice(btn.id, 1);
        renderTaxk();
      });
    });
  };
  renderTaxk();
}

todoList();


//! daily planner

function dailyPlanner(){
  const PlanDay=document.querySelector('.PlanDay')

let hour=Array.from({length:18},(ele,idx)=>{
    return `${6+idx }:00 - ${7+idx}:00`;
})
let hourSum=''
let data=JSON.parse(localStorage.getItem('dailyTask'))||{}
    console.log(data);
hour.forEach((elem,idx)=>{
    console.log(elem);
   var savedData=data[idx]||''
    hourSum+=` <div class="pllaner-time">
                       <p>${elem}</p>
                       <input id=${idx} type="text" placeholder="...." value=${savedData}>
                    
                </div>`
})


PlanDay.innerHTML=hourSum
var dailyTask={}
let planner_time=document.querySelectorAll('.pllaner-time input')
planner_time.forEach((ele)=>{
    ele.addEventListener('change',()=>{
        console.log(ele.id);
       dailyTask[ele.id]=ele.value
       localStorage.setItem('dailyTask',JSON.stringify(dailyTask))
    })
})
}

dailyPlanner()
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

