import WordRow from "./WordRow";

export default function App() {
  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-6xl text-center">MyWordle</h1>
      </header>
      <main>
        <WordRow letters="hel" />
        <WordRow letters="hello" />
        <WordRow letters="hello" />
      </main>
    </div>
  );
}
