function openFeatures(){
    let elems = document.querySelectorAll('.elem');
let fullElems = document.querySelectorAll('.fullElems');
let back=document.querySelectorAll('.fullElems .back')

//? to open indivisual pages
elems.forEach((elem)=>{
    elem.addEventListener('click',(()=>{
       fullElems[elem.id].style.display='block'
    }))
})

//?back btn logic
back.forEach((elem)=>{

   elem.addEventListener('click',((backelem)=>{
        console.log(elem.id);
         fullElems[elem.id].style.display='none'
   }))
})
}
openFeatures()

const checkBox=document.querySelector('.todoForm #imp input')

console.log(checkBox);
checkBox.addEventListener('changed',()=>{
     currentTask[index].imp = checkBox.checked;
})

const taskList=document.querySelector('.taskList')



var currentTask=[]
function storage(){
    if(localStorage.getItem('currentTask')==[]){
    console.log('list is empty');
   
}else{
     currentTask=JSON.parse(localStorage.getItem('currentTask'))
    console.log('full');
    taskList.innerText='Need to add task'
}
}
storage()

const form=document.querySelector('.todoForm')
const input=document.querySelector('.todoForm input')
const textarea=document.querySelector('.todoForm textarea')
const imp=document.querySelector('.imp')





form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(input.value, textarea.value);
        console.log(currentTask);
        currentTask.push({
            task:input.value,
            des:textarea.value,
            imp:checkBox.checked,
        })
        localStorage.setItem('currentTask', JSON.stringify(currentTask))
        renderTaxk()

})

const renderTaxk=()=>{
    
    
    let sum=''
currentTask.forEach((ele,idx)=>{

    console.log('hello');
    console.log(ele.task);
    sum+=` <div class="taskInfo">
        <div>
            <h4>${ele.task}</h4>
        <p style="margin-bottom: 20px;">${ele.des}</p>
      <span class="imp" style="display:${ele.imp ? 'block' : 'none'}">
            important!
          </span>
        </div>
        <div ><button class="status" id=${idx}>Mark as Completed</button></div>
      </div>`
})
taskList.innerHTML=sum

}
renderTaxk()



taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('status')) {
    // const index = e.target.id;
    currentTask.splice(e.target.id, 1);
    localStorage.setItem('currentTask', JSON.stringify(currentTask));
    renderTaxk();
  }
});
