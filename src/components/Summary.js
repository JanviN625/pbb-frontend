import React from "react";
import "../styles/Summary.css"; // Adjust the path as necessary
import Chatbot from "./Chatbot"; // Adjust the path as necessary

function Summary({ summary }) {
  return (
    <>
      <div className="summary-anchored">
        <div className="summary-info">
          <div>
            <div className="summary-label">Book Title</div>
            <div className="summary-value">{summary.book.join(", ")}</div>
          </div>
          <div>
            <div className="summary-label">Language</div>
            <div className="summary-value">{summary.language}</div>
          </div>
          <div>
            <div className="summary-label">Output Format</div>
            <div className="summary-value">{summary.format}</div>
          </div>
        </div>
      </div>
      <Chatbot summary={summary} />
    </>
  );
}

export default Summary;
