import { useState } from "react";
import { Plus, UserPlus, Users } from "lucide-react";

function ExpenseForm({
  people,
  onAddPerson,
  onAddExpense,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [newPerson, setNewPerson] = useState("");

  // Add a new person
  const handleAddPerson = (event) => {
    event.preventDefault();

    const name = newPerson.trim();

    if (!name) {
      alert("Please enter a person's name.");
      return;
    }

    const alreadyExists = people.some(
      (person) =>
        person.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      alert("This person already exists.");
      return;
    }

    // Add person to App state
    onAddPerson(name);

    // Automatically select the newly added person
    setSelectedPeople((current) => [
      ...current,
      name,
    ]);

    // If there is no payer yet,
    // make the first added person the payer
    if (!paidBy) {
      setPaidBy(name);
    }

    setNewPerson("");
  };

  // Select / unselect person for splitting
  const togglePerson = (person) => {
    setSelectedPeople((current) => {
      if (current.includes(person)) {
        return current.filter(
          (item) => item !== person
        );
      }

      return [...current, person];
    });
  };

  // Add expense
  const handleSubmit = (event) => {
    event.preventDefault();

    if (people.length === 0) {
      alert("Please add at least one person first.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter an expense name.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!paidBy) {
      alert("Please select who paid.");
      return;
    }

    if (selectedPeople.length === 0) {
      alert(
        "Please select at least one person to split the expense."
      );
      return;
    }

    const totalAmount = Number(amount);

    const perPerson =
      totalAmount / selectedPeople.length;

    const split = selectedPeople.map(
      (person) => ({
        person,
        amount: perPerson,
      })
    );

    const expense = {
      id: Date.now(),
      title: title.trim(),
      amount: totalAmount,
      paidBy,
      split,
    };

    onAddExpense(expense);

    // Reset expense form
    setTitle("");
    setAmount("");
    setPaidBy("");
    setSelectedPeople([]);
  };

  // Calculate preview amount
  const perPerson =
    selectedPeople.length > 0 &&
    Number(amount) > 0
      ? Number(amount) / selectedPeople.length
      : 0;

  return (
    <div className="card">

      {/* Header */}

      <div className="card-header">

        <div>
          <h2>Add Expense</h2>

          <p>
            Add an expense and split it
            between people
          </p>
        </div>

      </div>

      <form
        className="expense-form"
        onSubmit={handleSubmit}
      >

        {/* Expense Name */}

        <div className="input-group">

          <label>
            Expense Name
          </label>

          <input
            type="text"
            placeholder="e.g. Dinner"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />

        </div>

        {/* Amount */}

        <div className="input-group">

          <label>
            Amount
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="₹ 1200"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
          />

        </div>

        {/* Add Person */}

        <div className="add-person-section">

          <label>
            Add Person
          </label>

          <div className="add-person-row">

            <input
              type="text"
              placeholder="Enter person's name"
              value={newPerson}
              onChange={(event) =>
                setNewPerson(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddPerson(event);
                }
              }}
            />

            <button
              type="button"
              className="person-add-btn"
              onClick={handleAddPerson}
            >
              <UserPlus size={17} />
              Add
            </button>

          </div>

        </div>

        {/* No people message */}

        {people.length === 0 && (

          <div className="no-people">

            <Users size={20} />

            <div>
              <strong>
                No people added yet
              </strong>

              <p>
                Add people above to start
                splitting expenses.
              </p>
            </div>

          </div>

        )}

        {/* Paid By */}

        {people.length > 0 && (

          <div className="input-group">

            <label>
              Paid By
            </label>

            <select
              value={paidBy}
              onChange={(event) =>
                setPaidBy(event.target.value)
              }
            >

              <option value="">
                Select person
              </option>

              {people.map((person) => (
                <option
                  key={person}
                  value={person}
                >
                  {person}
                </option>
              ))}

            </select>

          </div>

        )}

        {/* Split Between */}

        {people.length > 0 && (

          <div className="split-section">

            <div className="split-header">

              <div>

                <label>
                  Split Between
                </label>

                <p>
                  Select who should share
                  this expense
                </p>

              </div>

              <span>
                {selectedPeople.length} selected
              </span>

            </div>

            <div className="people-grid">

              {people.map((person) => {

                const isSelected =
                  selectedPeople.includes(
                    person
                  );

                return (
                  <label
                    className={`person-option ${
                      isSelected
                        ? "selected"
                        : ""
                    }`}
                    key={person}
                  >

                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        togglePerson(person)
                      }
                    />

                    <span className="custom-checkbox">
                      ✓
                    </span>

                    <span>
                      {person}
                    </span>

                  </label>
                );
              })}

            </div>

          </div>

        )}

        {/* Per Person Preview */}

        {perPerson > 0 && (

          <div className="per-person">

            <span>
              Each person pays
            </span>

            <strong>
              ₹{perPerson.toFixed(2)}
            </strong>

          </div>

        )}

        {/* Submit */}

        <button
          type="submit"
          className="add-btn"
        >
          <Plus size={18} />
          Add Expense
        </button>

      </form>

    </div>
  );
}

export default ExpenseForm;