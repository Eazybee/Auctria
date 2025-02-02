# 🎟️ Frontend Interview Challenge – Ticket System  

This project is a **Vuejs**-based ticket purchasing system where users can view available tickets and add them to their cart. It leverages **Vuex** for state management and is built with **TypeScript**.  

<img src="https://github.com/Eazybee/Auctria/blob/main/screenshots/Screenshot%202025-02-02%20055336.png?raw=true"/>
<img src="https://github.com/Eazybee/Auctria/blob/main/screenshots/Screenshot%202025-02-02%20055311.png?raw=true"/>
<img src="https://github.com/Eazybee/Auctria/blob/main/screenshots/Screenshot%202025-02-02%20055405.png?raw=true"/>
---

## 🚀 Features  
✅ Display available tickets dynamically.  
✅ Admin can create, edit, update, and delete ticker
✅ Users can add tickets to their cart while stock lasts. 
✅ Users can remove tickets to their cart.
✅ Vuex state management for cart and tickets.
✅ Persisted store to localhost.
✅ Jest + Vue Test Utils for unit testing.  
✅ Prettier for code formating.  

---

## 🛠️ Tech Stack  
- **Frontend:** Vue , TypeScript  
- **State Management:** Vuex  
- **Testing:** Jest, Vue Test Utils  
- **Linting & Formatting:** Prettier  

---

## 📂 Project Structure  
<pre>
frontend-interview-challenge/ 
  │── src/ 
    ├── components/ # Reusable Vue components 
    ├── views/ # Page views (HomePage.vue)
    ├── store/ # Vuex store (state management) 
    ├── types/ # TypeScript interfaces 
    ├── tests/ # Unit tests (Jest + Vue Test Utils) 
    ├── main.ts # App entry point │── public/ # Static assets     
│── jest.config.js # Jest configuration 
│── tsconfig.json # TypeScript configuration 
│── package.json # Dependencies and scripts 
│── README.md # Project documentation
  </pre>

  ---

## 🏗️ Installation & Setup  

### **1️⃣ Clone the repository**
```sh
cd Auctria
```

### **2️⃣ Install dependencies**
```sh
npm install
```

### **3️⃣ Run the development server**
```
npm run dev
```
The app should now be running at `http://localhost:5173`

## 📌 Usage
Route: */*
- Add ticket to cart

Route: */admin*
- Create ticket
- Edit ticket
- Update ticket
- Delete ticket
- View all tickets

Route: */cart*
- View cart
- Remove Ticket from cart
- Checkout(Future Implementation)

## ✅ Running Tests
The project includes Jest tests for components and Vuex store logic.

Run all tests
```sh
npm run test
```