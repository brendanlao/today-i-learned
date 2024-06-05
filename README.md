## The Project
This web app is titled Today I Learned, and it is a single page application used to share and vote on interesting facts, built using React. It uses Supabase as a backend in order to store and retrieve facts.  

## Functionality
Users can view a list of facts, filter them by category, submit new facts, and vote on existing facts. Each user can only vote for each fact once and the facts are stored in a Supabase database.  To improve this project, I would add additional functionality such as user authentication and authorization as well as user profiles to manage facts added.  

## Project Screen Shot
This is the main view of the app.
<img width="1260" alt="Project main view" src="https://github.com/brendanlao/today-i-learned/assets/132109461/ea3b0638-40ca-4dd1-9e73-0d15f463d1ee">

This is how users filter facts in the database(in this case, the technology filter was selected).  Users can also upvote or downvote individual facts, and this is reflected in the orange highlight of the button.
<img width="1260" alt="Project displaying the submit form" src="https://github.com/brendanlao/today-i-learned/assets/132109461/3aa939d0-1ffc-4758-851f-7d3fbc94a2e4">

This is the database on Supabase
<img width="1260" alt="Supabase database" src="https://github.com/brendanlao/today-i-learned/assets/132109461/a835f3db-ddbe-4d95-959e-ebec673cd000">

## Reflection
This was a side project built to gain practical experience using React and integrating it with a backend API. The main goal was to familiarize myself with React fundamentals such as using components, passing props, and using hooks.  Additionally, I also familiarized myself with basic file organization, with designated JavaScript files for each component.  I also had additional practice dealing with asynchronous JavaScript and promises through async functions. 

This project was adapted off of Jonas Schmedtmann's full stack web app course, but with added functionality such as changing the upvote functionality so that a user could only upvote/downvote a fact once as well as changing the logic for displaying how many facts there were after filtering facts by category. The project was initialized using the create-react-app boilerplate, and while this is deprecated, I thought it was suitable since this was a project served as a way to familiarize myself with React.

One of the main challenges in this project was adjusting to the use of JSX.  More specifically, challenges included understanding how only JavaScript expressions and not statements could be used in JSX, adjusting to the syntax through camel casing attributes, as well as understanding why keys were needed when rendering lists.  However, understanding work-arounds such as using ternary or logical operators provided valuable learning experiences and deepened my understanding of JavaScript.  

Overall, this project provided a good opportunity to practice React fundamentals and further understand the frontend.  From this, I plan on exploring other advanced React topics such as state management using Redux, testing components using tools like React Testing Library, and performance optimization by understanding techniques such as memoization.  Additionally, I also plan on strengthening my fundamentals in HTML and CSS to become more well rounded.
