import getUserInput from "./modules.js";
import {
    Calculator,
    convertToJson,
    saveToLocalStorage,
    getFromLocalStorage,
    isPositive,
    operateOnNumbers,
    fetchData
} from "./modules.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Initialization Tests
    const number = getUserInput();
    console.log("Is Positive:", isPositive(number));
    console.log("Addition (5+3):", Calculator.add(5, 3));

    const loadBtn = document.getElementById("loadBtn");
    const clearBtn = document.getElementById("clearBtn");
    const tableBody = document.getElementById("tableBody");
    const table = document.getElementById("todoTable");

    // LOAD DATA ACTION
    loadBtn.addEventListener("click", async () => {
        loadBtn.innerText = "Loading...";
        const apiUrl = "https://jsonplaceholder.typicode.com/todos/";
        const data = await fetchData(apiUrl);

        if (data) {
            table.style.display = "table";
            tableBody.innerHTML = ""; // Clear existing content

            // We only show the first 15 items for better performance
            data.slice(0, 15).forEach(todo => {
                const row = document.createElement("tr");
                const statusText = todo.completed ? "Completed" : "Not yet Completed";
                const statusClass = todo.completed ? "completed" : "notCompleted";

                row.innerHTML = `
                    <td>${todo.userId}</td>
                    <td>${todo.id}</td>
                    <td>${todo.title}</td>
                    <td class="${statusClass}">${statusText}</td>
                `;
                tableBody.appendChild(row);
            });
        }
        loadBtn.innerText = "Load data from the API";
    });

    // CLEAR TABLE ACTION
    clearBtn.addEventListener("click", () => {
        tableBody.innerHTML = "";
        table.style.display = "none";
    });
});