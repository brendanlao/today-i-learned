export default function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="64" width="64" alt="Today I Learned Logo" />
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
