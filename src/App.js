import './App.css';
import { BrowserRouter as Router, Switch, Route,Link
} from 'react-router-dom';
import Routers from './Routers';
import axios from 'axios';
import NavB from './components/Base/Header/NavB';
import {Provider} from 'react-redux'
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
    <div className="App">
        <NavB/>
        <div className='container'>
          <Switch>
            {Routers.map(route =>{
                return(
                  <Route key={route.path} path={route.path} exact>
                    <route.component/>
                  </Route>
                )
            })}
          </Switch>
        </div>
    </div>
    </Provider>
    </Router>
  );
}

export default App;
