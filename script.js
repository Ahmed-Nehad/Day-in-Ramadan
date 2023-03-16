////////
// model
const inputContainer = document.getElementById('input-container');
const blackLayer = document.getElementById('layer');
blackLayer.addEventListener('click', hideContainer); 
const list0 = document.getElementById('list');
const list1 = document.getElementById('list1');
const list2 = document.getElementById('list2');
const list0Title = document.getElementById('list-title');
const list1Title = document.getElementById('list1-title');
const list2Title = document.getElementById('list2-title');
const addTodoBtn = document.getElementById('add-todo');
addTodoBtn.addEventListener('click', () => {showAddTodo();}); 
const pirList = document.getElementById('pir-list');
const textBox = document.getElementById('todo-text');
textBox.addEventListener('keydown', (e) => {if(e.key === 'Enter') addTodoFromTextbox()}); 

const buttonText = '🗑️';
let todos = [];

if(Array.isArray(getList()))
todos = getList();

saveList();
render();
hideContainer();

function addTodo(_txt, _priority){
  let item = {text : _txt, priority : _priority,isChecked : false};
  todos.push(item);
  saveList();
  render();
}

function removeTodoFromTodos(txt){
  if(isInTodos(txt)){
    todos.splice(todos.findIndex(x => x.text === txt), 1); 
    saveList();
    render();
  }
  else
  console.log(`Cant find this todo to remove '${txt}'`);  
}

function getList(){
  const data = JSON.parse(localStorage.getItem('todos'));
  return data;
}

function saveList(){
  localStorage.setItem('todos', JSON.stringify(todos));
}

///////
// view
function render(){
  // remove all items that aren't in the todos list
  for (let i = 0; i < 3; i++) {
    Array.from(eval(`list${i}`).children).forEach( c => { 
      if(!isInTodos(c.querySelector('.text').innerText))
      c.remove();
  })};

  // add all item that isn't on the list
  todos.forEach( (todo) => {
    if(!isInList(todo.text, eval(`list${todo.priority}`))){
      const checkBox = document.createElement('input');
      checkBox.type = 'checkBox';
      checkBox.id = `check-box-${todo.text}`;
      checkBox.checked = todo.isChecked;
      checkBox.addEventListener('change', () => {
        getItemFromTodos(todo.text).isChecked = checkBox.checked; 
        saveList();
      }); 

      const textHolder = document.createElement('label');
      textHolder.htmlFor = `check-box-${todo.text}`;
      textHolder.classList.add('text');
      textHolder.innerHTML = todo.text;

      const holder = document.createElement('div'); 
      holder.classList.add('holder');
      holder.appendChild(checkBox);
      holder.appendChild(textHolder);

      const delBtn = document.createElement('button');
      delBtn.innerHTML= buttonText;
      delBtn.addEventListener('click', () => {removeTodoFromTodos(todo.text)}); 

      const editBtn = document.createElement('button');
      editBtn.innerHTML= buttonText;
      editBtn.addEventListener('click', () => {removeTodoFromTodos(todo.text)}); 

      const todoItem = document.createElement('div');
      todoItem.appendChild(holder);
      todoItem.appendChild(delBtn);

      eval(`list${todo.priority}`).appendChild(todoItem);
    }
  });
  checkLists();
}

/////////
// control

function checkLists(){
  list0.style.display=list0.childElementCount>0?'flex':'none';
  list0Title.style.display=list0.childElementCount>0?'flex':'none';
  list1.style.display=list1.childElementCount>0?'flex':'none';
  list1Title.style.display=list1.childElementCount>0?'flex':'none';
  list2.style.display=list2.childElementCount>0?'flex':'none';
  list2Title.style.display=list2.childElementCount>0?'flex':'none';
}

function clearTodos(){
  while(todos.length > 0)
  todos.forEach(todo => removeTodoFromTodos(todo.text));
}

function showAddTodo(){
  blackLayer.style.display = 'block';
  inputContainer.style.transform = 'scale(1) translate(-50%, -50%) ';
  inputContainer.style.backgroundColor = 'var(--honey-yellow)';
}

function addTodoFromTextbox(){
  txt = textBox.value;
  if(txt != ''){
    if(!isInTodos(txt)){
    addTodo(txt, pirList.selectedIndex);
    textBox.value = '';
    hideContainer();
    }
    else
    alert('هذا العمل موجود بالفعل');
  }
  else
  alert('لم يتم كنابة اسم') 
}    

function hideContainer(){
  blackLayer.style.display = 'none';
  inputContainer.style.transform = 'scale(0) translate(-150vw, -50%)';
  inputContainer.style.backgroundColor = 'transparent';
}

function isInTodos(txt){
  let n = false;
  todos.forEach( t => { if(txt === t.text) n = true; });
  return n;
}

function isInList(txt, list){
  let n = false;
  Array.from(list.children).forEach(c => { 
    if(c.querySelector('.text').innerText === txt) n = true; 
  });
  return n;
}
function getItemFromTodos(txt){
  let item;
  if(isInTodos(txt)){
      todos.forEach(c => { if(c.text === txt) item = c ;
    });
  return item;
  }
}


function log(txt){
  console.log(txt);
}