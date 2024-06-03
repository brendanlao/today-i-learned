import { useState } from "react";
import supabase from "../supabase";
import CATEGORIES from "./data";

//Assign a component to each fact, so make a new function
//pass in a fact prop
export default function Fact({ fact, setFacts }) {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  //update row in a database
  async function handleVote(voteType) {
    let increment = 1;
    //make it so that a user can only increment a value once
    if (voteType === "upvotes") {
      //if they have pressed it before, then hasUpvoted is true, so set increment to -1  to revert to original state
      if (hasUpvoted) increment = -1;
      setHasUpvoted(!hasUpvoted);
    } else if (voteType === "downvotes") {
      if (hasDownvoted) increment = -1;
      setHasDownvoted(!hasDownvoted);
    }

    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [voteType]: fact[voteType] + increment })
      .eq("id", fact.id) //update the button at the id of that exact fact
      .select();

    //go through the facts array and if the id matches, replace that element with the updated elemnt with the increased vote
    //treat facts array as immutable, so use setFacts
    if (!error) {
      setFacts((facts) =>
        facts.map((el) => (el.id === fact.id ? updatedFact[0] : el))
      );
    }
    setIsUpdating(false);
  }

  return (
    <li className="fact">
      <p>{fact.text}</p>
      <a className="source" href={fact.source} target="_blank" rel="noreferrer">
        (source)
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
        <button
          onClick={() => handleVote("upvotes")}
          disabled={isUpdating}
          className={`vote-buttons ${hasUpvoted ? "active" : ""}`} //turn orange if updated
        >
          👍 {fact.upvotes}
        </button>
        <button
          onClick={() => handleVote("downvotes")}
          disabled={isUpdating}
          className={`vote-buttons ${hasDownvoted ? "active" : ""}`}
        >
          👎 {fact.downvotes}
        </button>
      </div>
    </li>
  );
}
