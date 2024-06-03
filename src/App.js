import "./style.css";
import { useEffect, useState } from "react";
//API keys contained in supabase.js
import supabase from "./supabase";
//Components
import Loader from "./components/Loader";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import CategoryFilter from "./components/CategoryFilter";
import FactList from "./components/FactList";

//Separate JS for each component in a big project
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

        //server side filtering of category in order to account large dataset
        let query = supabase.from("facts").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        //get data from supabase
        const { data: facts, error } = await query
          .order("upvotes", { ascending: false }) //sort by most interesting fact
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
      <hr className="divider" />
      {/* Pass setShowForm as a prop*/}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      {/* Toggle showing the fact form */}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList
            facts={facts}
            setFacts={setFacts}
            currentCategory={currentCategory}
          />
        )}
      </main>
    </>
  );
}

export default App;
