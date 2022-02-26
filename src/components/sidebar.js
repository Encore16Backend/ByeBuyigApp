import React from 'react';
import side from '../css/sidebar.css'
import { Dropdown, Button } from 'bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import GetBestCataItems from '../hooks/GetBestCataItems';
import CateList from '../pages/CateList';
import { Link, NavLink, Route } from 'react-router-dom';


const SideBar = ({setShow}) => {

    const moveCata = ()=>{
      setShow(false)
    }

    return (
      <>
  <aside className="sidebar">
         <header>
        
      </header>
    <nav className="sidebar-nav">
 
      <ul>
        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn" onClick={moveCata}>
          <Link to={{pathname:"/category",
                    state : {
                   id:'1',
                   cataname:"상의"
                   },
          }}>
            상의 (1)
          </Link>
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <span  onClick={moveCata}><i className="ion-ios-color-filter-outline"></i>
              <Link to={{pathname:"/category",
                    // search : "?id=10",
                    state : {
                   id:'10',
                   cataname:"반팔"
                   },
              }}>
                반팔 (10)
              </Link>
              
              </span>
            </li>
            <li>
              <span  onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{pathname:"/category",
                    state : {
                   id:'11',
                   cataname:"긴팔"
                   },
              }}>
                긴팔 (11)
              </Link>
              </span>
            </li>
          </ul>
          </div>
          </div>
        </li>
        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn" onClick={moveCata} >
          <Link to={{
           pathname:"/category",
          //  search : "?id=12",
           state : {
             id:'4',
             cataname:"하의"
           },
          }}>
            하의 (4)
          </Link>
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <span  onClick={moveCata}><i className="ion-ios-color-filter-outline"></i>
              <Link to={{pathname:"/category",
                    state : {
                   id:'13',
                   cataname:"반바지"
                   },
              }}>
                반바지 (13)
              </Link>
              </span>
            </li>
            <li>
              <span  onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{pathname:"/category",
                    state : {
                   id:'14',
                   cataname:"긴바지"
                   },
              }}>
                긴바지 (14)
              </Link>
              </span>
            </li>
           
          </ul>
          </div>
          </div>
        </li>

        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn" onClick={moveCata} >
          <Link to={{
           pathname:"/category",
           state : {
             id:'7',
             cataname:"아우터"
           },
          }}>
            아우터 (7)
          </Link>
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <span onClick={moveCata}><i className="ion-ios-color-filter-outline"></i>
              <Link to={{
           pathname:"/category",
           state : {
             id:'16',
             cataname:"코트"
           },
          }}>
            코트 (16)
          </Link>
              </span>
            </li>
            <li>
              <span onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{
              pathname:"/category",
              state : {
                id:'17',
                cataname:"패딩"
              },
              }}>
                패딩 (17)
              </Link>
              </span>
            </li>
          </ul>
          </div>
          </div>
        </li>

        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn" onClick={moveCata} >
          ETC 
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <span onClick={moveCata} ><i className="ion-ios-color-filter-outline"></i>
              <Link to={{
              pathname:"/category",
              state : {
                id:'18',
                cataname:"모자"
              },
              }}>
                모자 (18)
              </Link>
              
              </span>
            </li>
            <li>
              <span onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{
              pathname:"/category",
              state : {
                id:'19',
                cataname:"신발"
              },
              }}>
              신발 (19)
              </Link>
              
              
              </span>
            </li>
          </ul>
          </div>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
      </>
    );
}

export default SideBar;
