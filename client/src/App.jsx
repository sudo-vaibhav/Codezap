import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Wrapper from './components/hoc/Wrapper';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider } from './firebase/UserProvider';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <AuthProvider>
      <Wrapper>
        <Router>
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <ProtectedRoute path="/" redirectTo="/login">
              <Dashboard />
            </ProtectedRoute>
          </Switch>
        </Router>
      </Wrapper>
    </AuthProvider>
  );
}

export default App;
