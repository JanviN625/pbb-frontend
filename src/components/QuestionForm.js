import React from "react";
import Dropdown from "./Dropdown";
import "../styles/QuestionForm.css"; // Adjust the path as necessary

function QuestionForm({ summary, onChange, onSubmit, isAnimating }) {
  return (
    <div className={`form-wrapper ${isAnimating ? "slide-up" : ""}`}>
      <table>
        <tbody>
          <tr>
            <td>
              <div className="field-wrapper">
                <Dropdown
                  label="Book Title"
                  options={["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6"]}
                  selected={summary.book}
                  onChange={(value) => onChange("book", value)}
                  multiSelect={true}
                />
              </div>
            </td>
            <td>
              <div className="field-wrapper">
                <Dropdown
                  label="Language"
                  options={["English", "Hindi", "Tamil"]}
                  selected={summary.language}
                  onChange={(e) => onChange("language", e.target.value)}
                />
              </div>
            </td>
            <td>
              <div className="field-wrapper">
                <Dropdown
                  label="Output Format"
                  options={["Table", "Text", "JSON"]}
                  selected={summary.format}
                  onChange={(e) => onChange("format", e.target.value)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <h3>Your question</h3>
              <div className="field-wrapper">
                <textarea
                  rows="4"
                  placeholder="Type your question here"
                  value={summary.question}
                  onChange={(e) => onChange("question", e.target.value)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              <button onClick={onSubmit}>Submit Question</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default QuestionForm;