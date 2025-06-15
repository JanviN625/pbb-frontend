import "./App.css";
import React, { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import Summary from "./components/Summary";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [summary, setSummary] = useState({
    book: [],
    language: "",
    format: "",
    question: "",
  });
  const [error, setError] = useState("");
  const [hideForm, setHideForm] = useState(false);

  const handleSubmit = () => {
    if (
      summary.book.length === 0 ||
      !summary.language ||
      !summary.format ||
      !summary.question.trim()
    ) {
      setError("Please complete all fields before submitting.");
      return;
    }

    setIsAnimating(true);
    setError("");

    setTimeout(() => {
      setHideForm(true);
      setSubmitted(true);
      setIsAnimating(false);
    }, 800);
  };

  const handleChange = (field, value) => {
    setSummary((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pure BhaktiBase - Ask your question</h1>
      </header>
      <main>
        {error && <p className="error-message">{error}</p>}

        {!hideForm && (
          <QuestionForm
            summary={summary}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isAnimating={isAnimating}
          />
        )}

        {submitted && <Summary summary={summary}/>}
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Pure BhaktiBase. All rights reserved. All glories to Srila Gurudeva and Srila Prabhupada.
        </p>
      </footer>
    </div>
  );
}

export default App;
