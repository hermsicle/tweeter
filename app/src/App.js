import "./App.css";
import { Switch, Route } from "react-router-dom";
import { MyNavbar } from "./components/";
import { Home, Feed, Login, Signup } from "./pages/";

export default function App() {
  return (
    <div className="App">
      <MyNavbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/feed" component={Feed} />
      </Switch>
    </div>
  );
}
