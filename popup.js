document.addEventListener('DOMContentLoaded', function() {
    const checklist = document.getElementById('checklist');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const restoreTaskButton = document.getElementById('restore-task');
    let lastDeletedTask = null;
  
    const initialTasks = [
      "Weather App",
      "To-do List App",
      "Calculator App",
      "Online Quiz App",
      "Digital Clock",
      "Text To Voice Converter",
      "QR Code Generator",
      "Random Password Generator",
      "Notes App",
      "Quote Generator App",
      "Toast Notification",
      "Music Player",
      "Image Search Engine",
      "Popup Notification",
      "Mini Calendar",
      "Image Background Change",
      "Stopwatch",
      "Hide And Show Password",
      "Light & Dark Mode",
      "Image Slider",
      "Form Validation",
      "Drop Down Menu",
      "Circular Progress Bar",
      "Product Details Page",
      "Crypto Webpage",
      "Drag and Drop",
      "Email Subscription",
      "Password Strength Indicator",
      "Coming Soon Page"
    ];
  
    chrome.storage.sync.get('checklist', function(result) {
      const savedTasks = result.checklist;
  
      if (savedTasks && savedTasks.length > 0) {
        savedTasks.forEach(task => addTask(task.text, task.checked));
      } else {
        initialTasks.forEach(task => addTask(task));
        saveTasks();  // Save initial tasks to storage
      }
    });
  
    addTaskButton.addEventListener('click', function() {
      const taskText = newTaskInput.value;
      if (taskText) {
        addTask(taskText);
        newTaskInput.value = '';
        saveTasks();
      }
    });
  
    restoreTaskButton.addEventListener('click', function() {
      if (lastDeletedTask) {
        addTask(lastDeletedTask.text, lastDeletedTask.checked);
        lastDeletedTask = null;
        saveTasks();
      }
    });
  
    document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === 'z' && lastDeletedTask) {
        addTask(lastDeletedTask.text, lastDeletedTask.checked);
        lastDeletedTask = null;
        saveTasks();
      }
    });
  
    function addTask(taskText, isChecked = false) {
      const listItem = document.createElement('li');
      listItem.draggable = true;
  
      const taskTextElement = document.createElement('span');
      taskTextElement.textContent = taskText;
      if (isChecked) {
        listItem.classList.add('checked');
      }
  
      const deleteIcon = document.createElement('span');
      deleteIcon.textContent = '🗑️';
      deleteIcon.classList.add('delete-icon');
      deleteIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        lastDeletedTask = { text: taskText, checked: listItem.classList.contains('checked') };
        listItem.remove();
        saveTasks();
      });
  
      listItem.appendChild(taskTextElement);
      listItem.appendChild(deleteIcon);
      listItem.addEventListener('click', function() {
        listItem.classList.toggle('checked');
        saveTasks();
      });
      checklist.appendChild(listItem);
  
      addDragAndDropHandlers(listItem);
    }
  
    function saveTasks() {
      const tasks = [];
      checklist.querySelectorAll('li').forEach(item => {
        tasks.push({
          text: item.querySelector('span').textContent,
          checked: item.classList.contains('checked')
        });
      });
      chrome.storage.sync.set({ checklist: tasks });
    }
  
    function addDragAndDropHandlers(listItem) {
      listItem.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.index);
        event.target.classList.add('dragging');
      });
  
      listItem.addEventListener('dragend', function(event) {
        event.target.classList.remove('dragging');
      });
  
      checklist.addEventListener('dragover', function(event) {
        event.preventDefault();
        const dragging = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(event.clientY);
        if (afterElement == null) {
          checklist.appendChild(dragging);
        } else {
          checklist.insertBefore(dragging, afterElement);
        }
      });
  
      function getDragAfterElement(y) {
        const draggableElements = [...checklist.querySelectorAll('li:not(.dragging)')];
  
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
      }
    }
  
    checklist.querySelectorAll('li').forEach(addDragAndDropHandlers);
  });
  