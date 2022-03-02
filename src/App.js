import './App.css';
import { BrowserRouter as Router, Switch, Route,Link
} from 'react-router-dom';
import Routers from './Routers';
import axios from 'axios';
import NavB from './components/Base/Header/NavB';
import {Provider} from 'react-redux'
import store from './store';
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import rootReducer from './rootReducer';
import GetBestItems from './hooks/GetBestItems';
import Realsidebar from './components/Base/Side/Realsidebar';
import React, { useEffect, useState } from "react";



function App() {
  // 메인페이지 상품렌더링

  return (
    <Router>
      <Provider store={store}>
        
    <div className="App">
      <NavB/>
        <div>
          <Realsidebar/>
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
