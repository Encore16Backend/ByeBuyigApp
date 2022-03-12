import './App.css';
import { BrowserRouter as Router, Switch, Route,Link
} from 'react-router-dom';
import Routers from './Routers';
import NavB from './components/Base/Header/NavB';
import {Provider} from 'react-redux'
import store from './store';
import React from "react";
import postRefresh from './hooks/postRefresh';




function App() {
  
  if ( sessionStorage.getItem('id') ){
    setInterval(() => 
    postRefresh(), 60*2000);
    
  }

  return (
    <Router>
      <Provider store={store}>
    <div className="App">
      <NavB/>
        <div>
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
