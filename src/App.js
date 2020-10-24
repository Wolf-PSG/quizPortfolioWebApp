import React, { useContext} from 'react';
import './App.css';
import {
  Route, Switch, Redirect, BrowserRouter,
} from 'react-router-dom';
import SignInAndUp from './pages/sign/sign.component';
import Header from './components/header/header.component';
import QuizPage from './pages/createQuiz/createQuiz.page';
import DashBoard from './pages/dashboard/dashboard.component';
import CreateQuestion from './components/create-form/create-form.component';
import Landing from './pages/landing/landing_page';
import About from './pages/about/about.page';
import UpdateQuiz from './pages/updateQuiz/updateQuiz.page';
import { store } from './store/store';
import PlayQuiz from './components/playQuiz/playQuiz.component';
import FinishQuiz from './components/finishQuiz/finishQuiz.component';
const App = () => {
  const globalState = useContext(store);
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" render={() => {if (!globalState.state.loggedIn) {
              return <Landing />
            }
            return <DashBoard />;
        }}/>
        <Route
          path="/signin"
          render={() => {
            if (!globalState.state.loggedIn) {
              return <SignInAndUp />;
            }
            return <DashBoard />;
          }}
        />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/about" component={About} />
        <Route
          path="/quiz"
          render={() => {
            if (!globalState.state.loggedIn) {
              return <Redirect to={{ pathname: '/signin' }} />;
            }
            return <QuizPage />;
          }}
        />
        <Route path="/createQuizzes" component={CreateQuestion} />

        <Route path="/updateQuiz/:id" component={UpdateQuiz} />

        <Route path="/playQuiz/:id" component={PlayQuiz} />

        <Route path="/finishQuiz" component={FinishQuiz} />

      </Switch>
    </BrowserRouter>
  );
};
export default App;
