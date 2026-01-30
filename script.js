

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


 let header_h2=document.querySelector('.header1 h2')
 let header_day=document.querySelector('.header1 h1')
 let header_temp=document.querySelector('.header2 h2')
 let header_condition=document.querySelector('.header2 h3')
 let header_humidity=document.querySelector(".header2 h3:nth-of-type(2)")
 let header_wind=document.querySelector(".header2 h3:nth-of-type(3)")
 let header_city=document.querySelector('.header1 .city')

 let detectLocation=()=>{
  navigator.geolocation.getCurrentPosition(async(position)=>{
    const lat=position.coords.latitude;
    const log=position.coords.longitude;
    console.log(lat,log);
    var response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${log}&localityLanguage=en`)
    data = await response.json()
    console.log(data);
    header_city.innerText=`${data.city} (${data.principalSubdivision})`
    city=data.city
    weatherAPICall(city)
  })
 }
console.log(detectLocation());

let apiKey='e70c0d7f25df4f9e8cf70522263001';
async function weatherAPICall(){
  var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
  data = await response.json()
  console.log(data);
 header_temp.innerText=`${data.current.temp_c}°C`
 header_condition.innerText=data.current.condition.text
 header_humidity.innerText=`Humidity: ${data.current.humidity}%`
 header_wind.innerText=`Wind: ${data.current.wind_kph} km/h`
 
}



weatherAPICall()


//  let header_h2=document.querySelector('.header1 h2')
//  let header_day=document.querySelector('.header1 h1')
function getTimeDate(){
  function Timedate(){
  const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let date=new Date();
console.log(date);
let day=date.getDate();
let month=months[date.getMonth()];
let year=date.getFullYear();

let days=daysName[date.getDay()];
let min=date.getMinutes();
let hour=date.getHours();
let sec=date.getSeconds()
console.log(days);
console.log(hour);
console.log(min);
console.log(sec);
header_h2.innerText=`${day} ${month} ${year}`

if(hour>=12){
  header_day.innerText=`${days}, ${hour-12}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')} PM`
}else{
  header_day.innerText=`${days}, ${hour}:${String(min).padStart(2,'0')} :${String(sec).padStart(2,'0')} AM`
}
}

setInterval(()=>{
 Timedate()
},1000)
}
getTimeDate()


/*
  bg- #222831;
  nav-#393E46;

* */

function changeTheme(){
  var theme=document.querySelector('.theme');
  var rootElement=document.documentElement;
  const defaultTheme = {
  pri: getComputedStyle(rootElement).getPropertyValue('--pri'),
  sec: getComputedStyle(rootElement).getPropertyValue('--sec'),
  tri1: getComputedStyle(rootElement).getPropertyValue('--tri1'),
  tri2: getComputedStyle(rootElement).getPropertyValue('--tri2'),
};
  var flag=0;
  theme.addEventListener('click',()=>{
if (flag === 0) {
  // 🌙 Dark Coffee Theme
  rootElement.style.setProperty('--pri', '#1e1b18');
  rootElement.style.setProperty('--sec', '#2b2622');
  rootElement.style.setProperty('--tri1', '#feba17');
  rootElement.style.setProperty('--tri2', '#8a6b3f');
  flag = 1;

} else if (flag === 1) {
  // ☀️ Light Cream Theme
  rootElement.style.setProperty('--pri', '#F1EFEC');
  rootElement.style.setProperty('--sec', '#D4C9BE');
  rootElement.style.setProperty('--tri1', '#123458');
  rootElement.style.setProperty('--tri2', '#6A7BA2');
  flag = 2;

} else if (flag === 2) {
  // 🌊 Aqua Dark Theme
  rootElement.style.setProperty('--pri', '#222831');
  rootElement.style.setProperty('--sec', '#393E46');
  rootElement.style.setProperty('--tri1', '#00ADB5');
  rootElement.style.setProperty('--tri2', '#222831');
  flag = 3;

} else {
  // 🔁 ORIGINAL THEME (same as before)
  rootElement.style.setProperty('--pri', defaultTheme.pri);
  rootElement.style.setProperty('--sec', defaultTheme.sec);
  rootElement.style.setProperty('--tri1', defaultTheme.tri1);
  rootElement.style.setProperty('--tri2', defaultTheme.tri2);
  flag = 0;
}

  })
}
// changeTheme()