import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RecipeList from "./components/Recipe-list.component";
import RecipeFull from "./components/Recipe-full.component";
import RecipeEditor from "./components/Recipe-editor.component";
import RecipeCreator from "./components/Recipe-creator.component";

function App() {
  return (
    <Router>
      <div className="App">
        {/* - Header - */}
        <header className="Header">
          <h1>EZRecipe</h1>
        </header>
        {/* - Main - */}
        <main>
          <Route path="/" exact component={RecipeList} />
          <Route path="/recipe/:id" exact component={RecipeFull} />
          <Route path="/edit/:id" exact component={RecipeEditor} />
          <Route path="/add" exact component={RecipeCreator} />
        </main>
        {/* - Body - */}
        <footer className="Footer">
          <span>Copyright Alpinus Design 2020</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
