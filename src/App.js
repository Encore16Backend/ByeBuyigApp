import './App.css';
import { BrowserRouter, Switch, Route,Link
} from 'react-router-dom';
import Routers from './Routers';
import axios from 'axios';
import NavB from './components/Base/Header/NavB';
import { Provider } from 'react-redux';
import store from './store';
import { useHistory } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Provider store = {store}>
    <div className="App">
      <Route>
        <NavB/>
      </Route>
        <div className='container'>
          <Switch> {/* 선택된 라우트 하나만 렌더링하게 해줌 */}
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
    </BrowserRouter>
  );
}

export default App;
