import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Routes/Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import SignIn from "./Routes/SignIn";
import SignUp from "./Routes/SignUp";
import Start from "./Routes/Start";
import Tv from "./Routes/Tv";

function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/start">
          <Start />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
