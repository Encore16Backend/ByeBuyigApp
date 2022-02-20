import React from 'react';
import side from '../css/sidebar.css'
import { Dropdown, Button } from 'bootstrap';
import { ButtonGroup } from 'react-bootstrap';

const SideBar = () => {

    return (
      <>
      
  <aside className="sidebar">
         <header>
        
      </header>
    <nav className="sidebar-nav">
 
      <ul>


        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn">
          상의 
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <a href="#"><i className="ion-ios-color-filter-outline"></i>긴팔</a>
            </li>
            <li>
              <a href="#"><i className="ion-ios-clock-outline"></i>반팔</a>
            </li>
            <li>
              <a href="#"><i className="ion-android-star-outline"></i>맨투맨</a>
            </li>
            <li>
              <a href="#"><i className="ion-heart-broken"></i>니트</a>
            </li>
          </ul>
          </div>
          </div>
        </li>

        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn">
          하의 
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <a href="#"><i className="ion-ios-color-filter-outline"></i>반바지</a>
            </li>
            <li>
              <a href="#"><i className="ion-ios-clock-outline"></i>청바지</a>
            </li>
            <li>
              <a href="#"><i className="ion-android-star-outline"></i>면바지</a>
            </li>
            <li>
              <a href="#"><i className="ion-heart-broken"></i>카고바지</a>
            </li>
          </ul>
          </div>
          </div>
        </li>

        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn">
          아우터 
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <a href="#"><i className="ion-ios-color-filter-outline"></i>롱패딩</a>
            </li>
            <li>
              <a href="#"><i className="ion-ios-clock-outline"></i>숏패딩</a>
            </li>
            <li>
              <a href="#"><i className="ion-android-star-outline"></i>롱코트</a>
            </li>
            <li>
              <a href="#"><i className="ion-heart-broken"></i>자켓</a>
            </li>
            <li>
              <a href="#"><i className="ion-heart-broken"></i>숏코트</a>
            </li>
          </ul>
          </div>
          </div>
        </li>

        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn">
          악세사리 
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            <li>
              <a href="#"><i className="ion-ios-color-filter-outline"></i>모자</a>
            </li>
            <li>
              <a href="#"><i className="ion-ios-clock-outline"></i>반지</a>
            </li>
            <li>
              <a href="#"><i className="ion-android-star-outline"></i>목걸이</a>
            </li>
            <li>
              <a href="#"><i className="ion-heart-broken"></i>팔찌</a>
            </li>
          </ul>
          </div>
          </div>
        </li>

        <li>
          <div className="dropdown">
          <i className="ion-bag"></i> <span className="dropbtn">
          ETC 
          </span>
          <div className="dropdown-content">
          <ul className="nav-flyout">
            {/* <li>
              <a href="#"><i className="ion-ios-color-filter-outline"></i>롱패딩</a>
            </li>
            <li>
              <a href="#"><i className="ion-ios-clock-outline"></i>숏패딩</a>
            </li>
            <li>
              <a href="#"><i className="ion-android-star-outline"></i>롱코트</a>
            </li>
            <li>
              <a href="#"><i className="ion-heart-broken"></i>자켓</a>
            </li>
            <li>
              <a href="#"><i className="ion-heart-broken"></i>숏코트</a>
            </li> */}
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
