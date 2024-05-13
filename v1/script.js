const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://www.google.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source: "https://www.google.com/",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://www.google.com/",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

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

//Selecting DOM Elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

//Create DOM Elements (rendering facts in list)
factsList.innerHTML = "";

//Load data from Supabase
async function loadFacts() {
  const res = await fetch(
    "https://buuekobhzpaxvbpiekda.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dWVrb2JoenBheHZicGlla2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4Mjg4OTQsImV4cCI6MjAyODQwNDg5NH0.RC19dcOhyG8_tpGtU0i3VwMybaj2TJcsJxOAC-JDqKo",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dWVrb2JoenBheHZicGlla2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4Mjg4OTQsImV4cCI6MjAyODQwNDg5NH0.RC19dcOhyG8_tpGtU0i3VwMybaj2TJcsJxOAC-JDqKo",
      },
    }
  );
  const data = await res.json();
  // const filteredData = data.filter((fact) => fact.category === "society");
  // console.log(filteredData);
  const html = createFactsList(data);
  factsList.insertAdjacentHTML("afterbegin", html);
}

loadFacts();

//Toggle Form Visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});
console.log([2]);

//FUNCTIONS
function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
      <p>
        ${fact.text}
        <a
          class="source"
          href=${fact.source}
          target="_blank"
        >
          (Source)</a>
      </p>
      <span class="tag" style="background-color: ${
        CATEGORIES.find((cat) => cat.name === fact.category).color //find the color using the categories array
      }"
        >${fact.category}</span>
    </li>`
  );
  const html = htmlArr.join("");
  console.log(html);
  return html;
}
