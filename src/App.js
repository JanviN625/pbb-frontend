import "./App.css";
import React from "react";
import Dropdown from "./Dropdown";
import "./Styles.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PureBhaktiBase - Ask your question</h1>
      </header>
      <main>
        <table>
          <tbody>
            <tr>
              <td>
                <Dropdown
                  label="Book Title"
                  options={["Option 1", "Option 2", "Option 3"]}
                  selected=""
                  onChange={(e) => console.log(e.target.value)}
                />
              </td>
              <td>
                <Dropdown
                  label="Language"
                  options={["English", "Hindi", "Tamil"]}
                  selected=""
                  onChange={(e) => console.log(e.target.value)}
                />
              </td>
              <td>
                <Dropdown
                  label="Output Format"
                  options={["Table", "Text", "JSON"]}
                  selected=""
                  onChange={(e) => console.log(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="3">
                <h3>Your question</h3>
                <textarea
                  rows="4"
                  cols="80"
                  placeholder="Type your question here"
                  onChange={(e) => console.log(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                <button onClick={() => console.log("Submit button clicked")}>
                  Submit Question
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
