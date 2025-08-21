// --- TO-DO LIST LOGIC WITH COMPLETION ---
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleComplete(${index})" style="cursor:pointer; flex:1;">
        ${task.completed ? "<s>" + task.text + "</s>" : task.text}
      </span>
      <button class="remove-btn" onclick="removeTask(${index})">🗑️</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  let taskInput = document.getElementById("task");
  let text = taskInput.value.trim();
  if (text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
  }
}

function toggleComplete(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

loadTasks();

// --- PRODUCT FILTER & SORT (COMBINED) ---
const products = [
  { name: "Book A", category: "books", price: 150, rating: 4.5 },
  { name: "Book B", category: "books", price: 120, rating: 4.2 },
  { name: "Headphones", category: "electronics", price: 999, rating: 4.7 },
  { name: "Speaker", category: "electronics", price: 1499, rating: 4.6 },
];

function displayProducts(filtered = products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  if (filtered.length === 0) {
    productList.innerHTML = "<p>No products found ❌</p>";
    return;
  }
  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${p.price}</p>
      <p>Rating: ⭐ ${p.rating}</p>
    `;
    productList.appendChild(div);
  });
}

function updateProducts() {
  const category = document.getElementById("categoryFilter").value;
  const sortBy = document.getElementById("sortOption").value;

  let filtered = category === "all" ? [...products] : products.filter(p => p.category === category);

  if (sortBy === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filtered);
}

displayProducts();
