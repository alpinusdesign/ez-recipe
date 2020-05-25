import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import RecipeList from "./components/recipe-list.component";
import Recipe from "./components/recipe.component";
// import EditRecipe from "./components/edit-recipe.component";
// import CreateRecipe from "./components/create-recipe.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Route path="/" exact component={RecipeList} />
        <Route path="/:id" exact component={Recipe} />
        {/* <Route path="/edit/:id" component={EditRecipe} />
        <Route path="/create" component={CreateRecipe} /> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
