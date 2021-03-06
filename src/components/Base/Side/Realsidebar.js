import React from "react"
import "../../../css/sidebar.css"
import { Link } from "react-router-dom"


const Realsidebar = ()=>{
    return(
        <div>
            <div className="homeSideBar"> 
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <div className="dropdown ">
                                <i className="ion-bag"></i> <span className="dropbtn" >
                                    <Link to={{pathname:"/category",state : {id:'1',cataname:"상의",},}}> 
                                        상의</Link>
                                    </span>
                                <div className="dropdown-content">
                                    <ul className="nav-flyout">
                                        <li>
                                        <span ><i className="ion-ios-color-filter-outline"></i>
                                        <Link to={{pathname:"/category",
                                                state : {
                                            id:'5',
                                            cataname:"반팔"
                                            },
                                        }}>
                                            반팔
                                        </Link>
                                        
                                        </span>
                                        </li>
                                        <li>
                                        <span ><i className="ion-ios-clock-outline"></i>
                                        <Link to={{pathname:"/category",
                                                state : {
                                            id:'6',
                                            cataname:"긴팔"
                                            },
                                        }}>
                                            긴팔 
                                        </Link>
                                        </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                        <div className="dropdown">
                        <i className="ion-bag"></i> <span className="dropbtn"  >
                        <Link to={{
                        pathname:"/category",
                        state : {
                            id:'2',
                            cataname:"바지"
                        },
                        }}>
                            바지 
                        </Link>
                        </span>
                        <div className="dropdown-content">
                        <ul className="nav-flyout">
                            <li>
                            <span><i className="ion-ios-color-filter-outline"></i>
                            <Link to={{pathname:"/category",
                                    state : {
                                id:'8',
                                cataname:"반바지"
                                },
                            }}>
                                반바지 
                            </Link>
                            </span>
                            </li>
                            <li>
                            <span ><i className="ion-ios-clock-outline"></i>
                            <Link to={{pathname:"/category",
                                    state : {
                                id:'9',
                                cataname:"슬랙스"
                                },
                            }}>
                                슬랙스 
                            </Link>
                            </span>
                            </li>
                            <li>
                            <span ><i className="ion-ios-clock-outline"></i>
                            <Link to={{pathname:"/category",
                                    state : {
                                id:'10',
                                cataname:"데님팬츠"
                                },
                            }}>
                                데님팬츠 
                            </Link>
                            </span>
                            </li>
                        
                        </ul>
                        </div>
                        </div>
                        </li>

                        <li>
                        <div className="dropdown">
                        <i className="ion-bag"></i> <span className="dropbtn"  >
                        <Link to={{
                        pathname:"/category",
                        state : {
                            id:'4',
                            cataname:"아우터"
                        },
                        }}>
                            아우터
                        </Link>
                        </span>
                        <div className="dropdown-content">
                        <ul className="nav-flyout">
                            <li>
                            <span ><i className="ion-ios-color-filter-outline"></i>
                            <Link to={{
                        pathname:"/category",
                        state : {
                            id:'15',
                            cataname:"코트"
                        },
                        }}>
                            코트 
                        </Link>
                            </span>
                            </li>
                            <li>
                            <span ><i className="ion-ios-color-filter-outline"></i>
                            <Link to={{
                        pathname:"/category",
                        state : {
                            id:'16',
                            cataname:"코트"
                        },
                        }}>
                            트렌치 코트 
                        </Link>
                            </span>
                            </li>
                            
                            <li>
                            <span ><i className="ion-ios-clock-outline"></i>
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
                            <span ><i className="ion-ios-clock-outline"></i>
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
                        <i className="ion-bag"></i> <span className="dropbtn" >
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
                            <span ><i className="ion-ios-color-filter-outline"></i>
                            <Link to={{
                            pathname:"/category",
                            state : {
                                id:'12',
                                cataname:"롱스커트"
                            },
                            }}>
                                롱스커트
                            </Link>
                            
                            </span>
                            </li>
                            <li>
                            <span  ><i className="ion-ios-color-filter-outline"></i>
                            <Link to={{
                            pathname:"/category",
                            state : {
                                id:'11',
                                cataname:"미니스커트"
                            },
                            }}>
                                미니스커트
                            </Link>
                            
                            </span>
                            </li>
                            <li>
                            <span ><i className="ion-ios-clock-outline"></i>
                            <Link to={{
                            pathname:"/category",
                            state : {
                                id:'19',
                                cataname:"신발"
                            },
                            }}>
                            신발 
                            </Link>
                            </span>
                            </li>
                        </ul>
                        </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    )
}

export default Realsidebar