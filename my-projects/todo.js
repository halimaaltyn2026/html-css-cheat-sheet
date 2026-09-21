const taskInput = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const clearAllBtn = document.querySelector('#clearAllBtn');
const taskList = document.querySelector('#taskList');

// Функция, которая собирает все задачи с экрана и сохраняет их в память телефона
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        // Убираем текст кнопки "Х" из названия задачи
        const text = li.firstChild.textContent.trim();

      const isCompleted = li.classList.contains('completed');
        tasks.push({ text, completed: isCompleted });
    });
    localStorage.setItem('myTodoListTasks', JSON.stringify(tasks));
}

// Функция, которая достает задачи из памяти при открытии сайта
function loadTasks() {
    const saved = localStorage.getItem('myTodoListTasks');
    if (!saved) return;
    
    const tasks = JSON.parse(saved);
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Функция создания одного элемента на экране (чтобы не дублировать код)
function createTaskElement(text, isCompleted = false) {
    const li = document.createElement('li');
    li.textContent = text;
    li.style.cursor = 'pointer';
    
    if (isCompleted) {
        li.classList.add('completed');
        li.style.textDecoration = 'line-through';
        li.style.opacity = '0.5';
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px';

    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        if (li.style.textDecoration === 'line-through') {
            li.style.textDecoration = 'none';
            li.style.opacity = '1';
        } else {
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.5';
        }
        saveTasks(); // Сохраняем, когда зачеркнули
    });

    deleteBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        li.remove();
        saveTasks(); // Сохраняем, когда удалили одну задачу
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    createTaskElement(text);
    saveTasks(); // Сохраняем, когда добавили новую
    taskInput.value = '';
}

clearAllBtn.addEventListener('click', function() {
    taskList.innerHTML = '';
    localStorage.removeItem('myTodoListTasks'); // Полностью очищаем память
});

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Запускаем проверку памяти сразу при загрузке страницы!
loadTasks();

