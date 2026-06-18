import { useState } from "react";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="card">
        <h1> Counter App</h1>
        

        <div className="display">{count}</div>

        <div className="status">
          {count > 0
            ? "🟢 Positive"
            : count < 0
            ? "🔴 Negative"
            : "⚪ Zero"}
        </div>

        <div className="buttons">
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
