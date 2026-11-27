import {
  Receipt,
  Trash2,
  Users,
} from "lucide-react";

function ExpenseList({
  expenses,
  onDelete,
}) {
  return (
    <div
      className="card"
      id="expenses"
    >

      <div className="card-header">

        <div>
          <h2>Recent Expenses</h2>
          <p>
            All your shared expenses
          </p>
        </div>

        <span className="count">
          {expenses.length}
        </span>

      </div>

      {expenses.length === 0 ? (

        <div className="empty-state">

          <Receipt size={42} />

          <h3>
            No expenses yet
          </h3>

          <p>
            Add your first expense
            to get started.
          </p>

        </div>

      ) : (

        <div className="expense-list">

          {expenses.map((expense) => {

            const perPerson =
              expense.split.length > 0
                ? expense.amount /
                  expense.split.length
                : 0;

            return (
              <div
                className="expense-item expense-detail"
                key={expense.id}
              >

                <div className="expense-top">

                  <div className="expense-icon">
                    <Receipt size={20} />
                  </div>

                  <div className="expense-info">

                    <h3>
                      {expense.title}
                    </h3>

                    <p>
                      Paid by{" "}
                      <strong>
                        {expense.paidBy}
                      </strong>
                    </p>

                  </div>

                  <div className="expense-right">

                    <strong>
                      ₹
                      {expense.amount.toFixed(
                        2
                      )}
                    </strong>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        onDelete(expense.id)
                      }
                      title="Delete expense"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

                <div className="split-result">

                  <div className="split-result-title">
                    <Users size={15} />

                    <span>
                      Split between{" "}
                      {expense.split.length}{" "}
                      people
                    </span>

                    <strong>
                      ₹
                      {perPerson.toFixed(2)}
                      {" / person"}
                    </strong>
                  </div>

                  <div className="split-people">

                    {expense.split.map(
                      (item) => (
                        <div
                          className="split-person"
                          key={item.person}
                        >
                          <span>
                            {item.person}
                          </span>

                          <strong>
                            ₹
                            {item.amount.toFixed(
                              2
                            )}
                          </strong>
                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}

export default ExpenseList;