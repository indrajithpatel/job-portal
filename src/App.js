import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import FreeLancer from "./components/freelancer/Freelancer"
import Employer from './components/employer/Employer';
import UserProfile from './components/freelancer/UserProfile';
import {GlobalContextProvider, globalUseContext} from "./components/contexts/useGlobalContext"
import NotFound from './components/Notfound/NotFound';

function App() {
  return (
    <GlobalContextProvider>
      <main>
            <Switch>
                <Route path="/" component={LoginPage} exact />
                <Route path="/userProfile" component={UserProfile} />
                <Route path="/freelancer/:freelancerID" component={FreeLancer} />
                <Route path="/employer" component={Employer} />
                <Route component={NotFound} />
            </Switch>
      </main>
    </GlobalContextProvider>
    
  );
}

export default App;
