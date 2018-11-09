import React from 'react';
import myImg from '../img/coocloud-text.jpeg'

export default ({children}) => {
    return (
        <div className="container">
            <div>
                <img src={myImg} alt="coocloud logo"/>
            </div>
            <div>
                <p className="flow-text" style={{textAlign: "center"}}>Built with: React, GraphQL, MongoDB, WebPack</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}