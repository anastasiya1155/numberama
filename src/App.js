import Field from "./Field";

function App() {
  return (
    <div className="w-screen min-h-screen bg-slate-900 flex justify-start items-center pb-10 flex-col">
      <Field/>
      <p className="text-gray-400 mt-10 w-[364px]">
        Numberama aka numbers game or numberzilla is a casual and very addictive game with very easy rules.
        The goal is to remove all numbers from the field. Numbers are removed in pairs. A pair can be two numbers
        that add up to 10 or two same numbers. The numbers in a pair should be neighbours vertically or horizontally.
        You can use a hint, undo last move (only one), add new numbers to the field, or start a new game with
        random or ordered numbers. That's it, have fun! Play online for free without registration, annoying ads
        and hidden fees.
      </p>
    </div>
  );
}

export default App;
