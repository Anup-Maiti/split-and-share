import {
  IndianRupee,
  Users,
  Calculator,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

function Summary({
  people,
  expenses,
}) {
  const total = expenses.reduce(
    (sum, expense) =>
      sum + expense.amount,
    0
  );

  // Calculate each person's paid amount
  const balances = people.map((person) => {

    let paid = 0;
    let share = 0;

    expenses.forEach((expense) => {

      if (expense.paidBy === person) {
        paid += expense.amount;
      }

      const personSplit =
        expense.split.find(
          (item) =>
            item.person === person
        );

      if (personSplit) {
        share += personSplit.amount;
      }

    });

    const balance = paid - share;

    return {
      person,
      paid,
      share,
      balance,
    };
  });

  const average =
    people.length > 0
      ? total / people.length
      : 0;

  return (
    <div
      className="summary-card"
      id="summary"
    >

      <div className="summary-title">

        <h2>
          Expense Summary
        </h2>

        <p>
          See everyone's balance
        </p>

      </div>

      {/* Total */}

      <div className="summary-box">

        <div className="summary-icon">
          <IndianRupee size={20} />
        </div>

        <div>
          <span>
            Total Expenses
          </span>

          <h3>
            ₹{total.toFixed(2)}
          </h3>
        </div>

      </div>

      {/* People */}

      <div className="summary-box">

        <div className="summary-icon">
          <Users size={20} />
        </div>

        <div>
          <span>
            People
          </span>

          <h3>
            {people.length}
          </h3>
        </div>

      </div>

      {/* Average */}

      <div className="summary-box">

        <div className="summary-icon">
          <Calculator size={20} />
        </div>

        <div>
          <span>
            Average per Person
          </span>

          <h3>
            ₹{average.toFixed(2)}
          </h3>
        </div>

      </div>

      {/* BALANCES */}

      <div className="balances">

        <h3 className="balance-heading">
          Individual Balances
        </h3>

        {balances.map((item) => {

          let status = "settled";

          if (item.balance > 0.01) {
            status = "gets";
          }

          if (item.balance < -0.01) {
            status = "owes";
          }

          return (
            <div
              className="balance-person"
              key={item.person}
            >

              <div className="balance-person-left">

                <div className="avatar">
                  {item.person
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <strong>
                    {item.person}
                  </strong>

                  <small>
                    Paid ₹
                    {item.paid.toFixed(2)}
                    {" • "}
                    Share ₹
                    {item.share.toFixed(2)}
                  </small>
                </div>

              </div>

              <div
                className={`balance-value ${status}`}
              >

                {status === "gets" && (
                  <ArrowUp size={14} />
                )}

                {status === "owes" && (
                  <ArrowDown size={14} />
                )}

                {status === "settled"
                  ? "Settled"
                  : `₹${Math.abs(
                      item.balance
                    ).toFixed(2)}`}

              </div>

            </div>
          );
        })}

      </div>

      <div className="tip-box">
        💡 Positive balance means the
        person should receive money.
        Negative balance means they
        need to pay.
      </div>

    </div>
  );
}

export default Summary;