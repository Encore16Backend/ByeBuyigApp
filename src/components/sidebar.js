import React from 'react';
import side from '../css/sidebar.css'
import { Dropdown, Button } from 'bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import GetBestCataItems from '../hooks/GetBestCataItems';
import CateList from '../pages/CateList';
import { Link, NavLink, Route } from 'react-router-dom';
import qs from "qs"


const SideBar = ({setShow}) => {
// main/category/order?category=1&order=1&page=1
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
                    // search : "?id=9",
                    state : {
                   id:'1',
                   },
          }}>
            상의 (9)
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
                   },
              }}>
                반팔 (10)
              </Link>
              
              </span>
            </li>
            <li>
              <span  onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{pathname:"/category",
                    // search : "?id=10",
                    state : {
                   id:'10',
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
        {/* // 9상의 10반팔 11긴팔 12하의 13반바지 14긴바지 15아우터 16코트 17패딩 18모자 19신발 */}
        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn" onClick={moveCata} >
          <Link to={{
           pathname:"/category",
          //  search : "?id=12",
           state : {
             id:'4',
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
                    // search : "?id=13",
                    state : {
                   id:'13',
                   },
              }}>
                반바지 (13)
              </Link>
              </span>
            </li>
            <li>
              <span  onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{pathname:"/category",
                    // search : "?id=14",
                    state : {
                   id:'14',
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
          //  search : "?id=15",
           state : {
             id:'7',
           },
          }}>
            아우터 (15)
          </Link>
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <span onClick={moveCata}><i className="ion-ios-color-filter-outline"></i>
              <Link to={{
           pathname:"/category",
          //  search : "?id=16",
           state : {
             id:'16',
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
              // search : "?id=17",
              state : {
                id:'17',
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
              // search : "?id=18",
              state : {
                id:'18',
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
              // search : "?id=19",
              state : {
                id:'19',
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
