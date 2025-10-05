import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Neuro Hyderabad</h1>
        <p>Neurological Healthcare Website - React Version</p>
      </header>

      <main className="main-content">
        <section>
          <h2>Welcome</h2>
          <p>This is a React-based version of the Neuro Hyderabad website.</p>
          <p>This page is served to validate the React setup.</p>
        </section>

        <section>
          <h3>Services</h3>
          <ul>
            <li>Neurological Consultations</li>
            <li>Brain Imaging</li>
            <li>Treatment Planning</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
