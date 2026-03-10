// Module 1: User Input
export default function getUserInput() {
    const userInput = prompt("Enter a number:");
    return userInput ? parseInt(userInput) : 0;
}

// Module 2: Classes
export class Calculator {
    static add = (a, b) => a + b;
    static subtract = (a, b) => a - b;
}

// Module 3: JSON
export const convertToJson = (data) => JSON.stringify(data);

// Module 4: Web Storage
export const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getFromLocalStorage = (key) => localStorage.getItem(key);

// Module 5: Ternary Operator
export const isPositive = (number) => (number > 0);

// Module 6: Higher Order Functions
export const operateOnNumbers = (a, b, operation) => operation(a, b);

// Module 7: Fetch API
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API Limit reached or network error");
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
};