import React from "react";
import './home.css';

import { Link } from "react-router-dom";

const Home = () => {



    return (

        <div className="root-home">
            <main >
                <nav className="mainhome">
                    <h1 className='title-conte'>PRUEBAS</h1>
                    <div className="nav">
                        <nav className="navintro">
                            <ul className="ulLayout">
                                <li className="liLayout">            
                                    
                                    <Link className="aLayout" to="../PruebasAG"><svg width="175" height="120" xmlns="http://www.w3.org/2000/svg">
                                        <text x="0" y="110" font-family="Arial" font-size="130" fill="white">A</text>
                                        <text x="80" y="110" font-family="Arial" font-size="130" fill="white">G</text>
                                    </svg>
                                    </Link>
                                </li>
                                <li className="liLayout">
                                    <Link className="aLayout" to="/PruebasHN"><svg width="175" height="120" xmlns="http://www.w3.org/2000/svg">
                                        <text x="0" y="110" font-family="Arial" font-size="130" fill="white">H</text>
                                        <text x="80" y="110" font-family="Arial" font-size="130" fill="white">N</text>
                                    </svg></Link>
                                </li>
                                <li className="liLayout">
                                    <Link className="aLayout" to="/PruebasNT"><svg width="175" height="120" xmlns="http://www.w3.org/2000/svg">
                                        <text x="10" y="110" font-family="Arial" font-size="122" fill="white">Ñ</text>
                                        <text x="90" y="110" font-family="Arial" font-size="130" fill="white">T</text>
                                    </svg></Link>
                                </li>                                
                                <li className="liLayout">
                                    <Link className="aLayout" to="/PruebasUZ"><svg width="175" height="120" xmlns="http://www.w3.org/2000/svg">
                                        <text x="0" y="110" font-family="Arial" font-size="130" fill="white">U</text>
                                        <text x="90" y="110" font-family="Arial" font-size="130" fill="white">Z</text>
                                    </svg></Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </nav>
            </main>
        </div>
    );
};

export default Home;
