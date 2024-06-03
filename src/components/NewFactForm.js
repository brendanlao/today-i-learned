import supabase from "../supabase.js";
import CATEGORIES from "./data.js";
import { useState } from "react";

export default function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false); //disable buttons if in the process of uploading a new fact
  const TEXT_LIMIT = 200;

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

  // e for event
  async function handleSubmit(e) {
    //Present Browser Reload
    e.preventDefault();

    //Check if the data is valid
    if (text && validURL(source) && category && text.length <= TEXT_LIMIT) {
      console.log("There is valid data");
    } else {
    }

    //Create a new fact if the data is valid and upload to supabase
    setIsUploading(true);
    const { data: newFact, error } = await supabase
      .from("facts")
      .insert([{ text, source, category }])
      .select();
    setIsUploading(false);
    //newFact is an array of these objects and contains only one element

    //Add the fact to the UI
    if (!error) setFacts((fact) => [newFact[0], ...fact]);
    else console.log("Error uploading");
    // setFacts((fact) => fact.push(newFact[0])); NOT RECOMMENDED BECAUSE TREAT STATE AS IMMUTABLE

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
        disabled={isUploading}
      />
      {/*update state*/}
      <span>{TEXT_LIMIT - text.length}</span>
      <input
        type="text"
        placeholder="http://example.com"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
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
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}
