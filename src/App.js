import "./style.css";
//API keys contained in supabase.js
import supabase from "./supabase";
import { useEffect, useState } from "react";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

//Looks like HTML, but is in JSX
//Separate JS for each component in a big project
//Curly braces can be used in JSX to write JS
function App() {
  const [facts, setFacts] = useState([]); //used to update the facts array
  //empty array ensures that useEffect only runs when the app renders
  const [showForm, setShowForm] = useState(false); //used to display the form
  const [isLoading, setIsLoading] = useState(false); //used to display the loading text
  const [currentCategory, setCurrentCategory] = useState("all"); //used to filter categories

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        //get data from supabase
        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false }) //sort by most interesting fact
          .limit(25); //limit to 25 facts on a page

        //only set facts if there are no errors
        if (!error) {
          setFacts(facts);
        } else {
          alert("There was a problem loading the data");
        }

        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );
  //dependency array, when currentCategory changes, run this function again
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/* Pass setShowForm as a prop*/}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      {/* Toggle showing the fact form */}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} />}
      </main>
    </>
  );
}

//edit this loader
function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((form) => !form)}
      >
        {showForm ? "Close" : "Share a Fact"}
        {/*Change the text depending on the state of showForm*/}
      </button>
    </header>
  );
}

//check the source input for a valid url
function validURL(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const TEXT_LIMIT = 200;

  // e for event
  function handleSubmit(e) {
    //Present Browser Reload
    e.preventDefault();

    //Check if the data is valid
    if (text && validURL(source) && category && text.length <= TEXT_LIMIT) {
      console.log("There is valid data");
    } else {
    }

    //Create a new fact if the data is valid
    //properties have same name as variables, so don't need : val
    const newFact = {
      id: Math.round(Math.random() * 100),
      text,
      source,
      category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: 2024,
    };

    //Add the fact to the UI
    setFacts((fact) => [newFact, ...fact]);
    // setFacts((fact) => fact.push(newFact)); NOT RECOMMENDED BECAUSE TREAT STATE AS IMMUTABLE

    //Reset the input field
    setText("");
    setSource("");
    setCategory("");

    //Close the form
    setShowForm(false);
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a Fact..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/*update state*/}
      <span>{TEXT_LIMIT - text.length}</span>
      <input
        type="text"
        placeholder="http://example.com"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option key="default" value="">
          Choose Category:
        </option>
        {/* MAP CATEGEORIES TO SELECT  */}
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li>
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts }) {
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

//Assign a component to each fact, so make a new function
function Fact({ fact }) {
  return (
    <li className="fact">
      <p>{fact.text}</p>
      <a className="source" href={fact.source} target="_blank" rel="noreferrer">
        (Source)
      </a>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((el) => el.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>😱 {fact.votesMindblowing}</button>
        <button>👎 {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
