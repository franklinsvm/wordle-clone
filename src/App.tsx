import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto w-96">
      <h1 className="text-6xl text-center">MyWordle</h1>
    </div>
  );
}

export default App;
