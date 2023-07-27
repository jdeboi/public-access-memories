import React from 'react';
import '../Page.css';
import { Link } from 'react-router-dom';
import { ShowConfig } from '../../../data/CurrentShow/ShowConfig';
import OpenCallOpen from './OpenCallOpen';

export const OpenCall = () => {

    return (
        <div className="Statement  Page">
            <div className="container">

                <h1>OPEN CALL</h1>
                <br />
                <br />
                <br />
                {ShowConfig.isOpenCallOpen ? <OpenCallOpen /> :
                    <React.Fragment>
                        <h3>...is CLOSED...</h3>
                        <p>Please checkout the <Link to="/statement">statement</Link></p>
                        <br />
                        <br />
                        <br />
                    </React.Fragment>}
            </div>
        </div>
    )
};

export default OpenCall;