import './App.css';
import { Switch, Route, Link } from "react-router-dom";

import Home from './pages/Home'
import HowWork from './pages/HowWork'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Logout from './components/admin/Logout'
import AddSchool from './components/admin/AddSchool'
import CheckSchool from './components/admin/CheckSchool'

function App() {
  return (
    <Switch>
    <Route path="/" exact={true}><Home /></Route>
    <Route path="/howwork"><HowWork /></Route>
    <Route path="/about"><About /></Route>
    <Route path="/contact"><Contact /></Route>
    <Route path="/login"><Login /></Route>
    <Route path="/dashboard"><Dashboard /></Route>
    <Route path="/logout"><Logout /></Route>
    <Route path="/addSchool"><AddSchool /></Route>
    <Route path="/checkSchool"><CheckSchool /></Route>
    <Route path="*"><PageNotFound /></Route>
   </Switch>
  );
}

function PageNotFound(){
  return(
    <div>
      <h1>It Is 404 Page Not Found</h1>
      <center><h5 id="returnToHome">Return to <Link to="/">Home</Link></h5></center>
    </div>
  )
}

export default App;
