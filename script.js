// Seleção de elementos
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Função para carregar tarefas do localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task.text, task.completed));
}

// Função para adicionar tarefa ao DOM
function addTaskToDOM(text, completed = false) {
  const li = document.createElement("li");
  li.className = `flex justify-between items-center p-2 bg-gray-200 rounded ${completed ? "line-through" : ""}`;

  // Conteúdo da tarefa

  li.innerHTML = `
  <span>${text}</span>
  <div class="flex space-x-2">
    <button class="editBtn bg-blue-500 text-white px-4 py-2 rounded">Editar</button>
    <button class="deleteBtn bg-blue-500 text-white px-4 py-2 rounded">Excluir</button>
  </div>
`;

  // Marcar como concluída ao clicar no texto
  li.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      li.classList.toggle("line-through");
      updateTaskStatus(text);
    }
  });

  // Botão de edição
  li.querySelector(".editBtn").addEventListener("click", () => {
    const newText = prompt("Editar tarefa:", text);
    if (newText) {
      updateTaskText(text, newText);
      li.querySelector("span").textContent = newText;
    }
  });

  // Botão de exclusão
  li.querySelector(".deleteBtn").addEventListener("click", () => {
    removeTask(text);
    taskList.removeChild(li);
  });

  taskList.appendChild(li);
}

// Função para adicionar tarefa
function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    addTaskToDOM(text);
    saveTask(text);
    taskInput.value = "";
  }
}

// Salvar tarefa no localStorage
function saveTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Atualizar texto da tarefa
function updateTaskText(oldText, newText) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find((t) => t.text === oldText);
  task.text = newText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Atualizar status da tarefa (concluída/não concluída)
function updateTaskStatus(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find((t) => t.text === text);
  task.completed = !task.completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remover tarefa
function removeTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")).filter((t) => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Eventos
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Inicialização
loadTasks();
