import Fact from "./Fact";

export default function FactList({ facts, setFacts, currentCategory }) {
  //the display message differs based on the current category and the number of facts to be displayed
  //this function aims to alleviate that by considering all of these factors
  function displayMessage() {
    if (currentCategory === "all")
      return (
        <p>There are {facts.length} facts in the database. Add your own!</p>
      );
    if (facts.length === 0)
      return (
        <p>
          There are no {currentCategory} facts in the database. Add your own!
        </p>
      );
    else if (facts.length === 1)
      return (
        <p>
          There is {facts.length} {currentCategory} fact in the database. Add
          your own!
        </p>
      );
    else
      return (
        <p>
          There are {facts.length} {currentCategory} facts in the database. Add
          your own!
        </p>
      );
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      {displayMessage()}
    </section>
  );
}
