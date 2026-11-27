import { useState } from "react";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import "./App.css";

function App() {
  const [people, setPeople] = useState([]);

  const [expenses, setExpenses] = useState([]);

  const addPerson = (name) => {
    const cleanName = name.trim();

    if (!cleanName) return;

    const exists = people.some(
      (person) =>
        person.toLowerCase() ===
        cleanName.toLowerCase()
    );

    if (exists) {
      alert("This person already exists.");
      return;
    }

    setPeople((current) => [
      ...current,
      cleanName,
    ]);
  };

  const addExpense = (expense) => {
    setExpenses((current) => [
      ...current,
      expense,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((current) =>
      current.filter(
        (expense) => expense.id !== id
      )
    );
  };

  return (
    <div className="app">

      <Navbar />

      <main className="container">

        <section className="hero">

          <div className="badge">
            💸 Smart Expense Sharing
          </div>

          <h1>
            Split expenses.
            <br />
            <span>Share memories.</span>
          </h1>

          <p>
            Add your friends, split expenses,
            and easily see who owes whom.
          </p>

        </section>

        <section
          className="dashboard"
          id="dashboard"
        >

          <div className="left-column">

            <ExpenseForm
              people={people}
              onAddPerson={addPerson}
              onAddExpense={addExpense}
            />

            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
            />

          </div>

          <div className="right-column">

            <Summary
              people={people}
              expenses={expenses}
            />

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;