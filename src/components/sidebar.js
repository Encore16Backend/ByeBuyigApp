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

    // 1 상의 2 바지 3 스커트 4 아우터 5 반팔 6 긴팔 7 셔츠 8 반바지
    // 9 슬렉스 10 데님팬츠 11 롱스커트 12 롱스커트 13 롱패딩 15 코트
    // 16 트렌치 코트
    

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
                   cataname:"상의",

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
                   id:'5',
                   cataname:"반팔"
                   },
              }}>
                반팔 (5)
              </Link>
              
              </span>
            </li>
            <li>
              <span  onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{pathname:"/category",
                    state : {
                   id:'6',
                   cataname:"긴팔"
                   },
              }}>
                긴팔 (6)
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
             id:'2',
             cataname:"바지"
           },
          }}>
            바지 (2)
          </Link>
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <span  onClick={moveCata}><i className="ion-ios-color-filter-outline"></i>
              <Link to={{pathname:"/category",
                    state : {
                   id:'8',
                   cataname:"반바지"
                   },
              }}>
                반바지 (8)
              </Link>
              </span>
            </li>
            <li>
              <span  onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{pathname:"/category",
                    state : {
                   id:'9',
                   cataname:"슬랙스"
                   },
              }}>
                슬랙스 (9)
              </Link>
              </span>
            </li>
            <li>
              <span  onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{pathname:"/category",
                    state : {
                   id:'10',
                   cataname:"데님팬츠"
                   },
              }}>
                데님팬츠 (10)
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
             id:'4',
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
             id:'15',
             cataname:"코트"
           },
          }}>
            코트 (16)
          </Link>
              </span>
            </li>
            <li>
              <span onClick={moveCata}><i className="ion-ios-color-filter-outline"></i>
              <Link to={{
           pathname:"/category",
           state : {
             id:'16',
             cataname:"코트"
           },
          }}>
            트렌치 코트 (16)
          </Link>
              </span>
            </li>
            
            <li>
              <span onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{
              pathname:"/category",
              state : {
                id:'13',
                cataname:"롱패딩"
              },
              }}>
                롱패딩
              </Link>
              </span>
            </li>

            <li>
              <span onClick={moveCata}><i className="ion-ios-clock-outline"></i>
              <Link to={{
              pathname:"/category",
              state : {
                id:'14',
                cataname:"숏패딩"
              },
              }}>
                숏패딩
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
             id:'3',
             cataname:"스커트"
           },
          }}>
            스커트
          </Link> 
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <span onClick={moveCata} ><i className="ion-ios-color-filter-outline"></i>
              <Link to={{
              pathname:"/category",
              state : {
                id:'12',
                cataname:"롱스커트"
              },
              }}>
                롱스커트 (12)
              </Link>
              
              </span>
            </li>
            <li>
              <span onClick={moveCata} ><i className="ion-ios-color-filter-outline"></i>
              <Link to={{
              pathname:"/category",
              state : {
                id:'11',
                cataname:"미니스커트"
              },
              }}>
                미니스커트 (12)
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
