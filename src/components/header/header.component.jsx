import React from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {selectSprint} from './../../redux/sprint/sprint.selectors';

import './header.styles.scss';

const Header = ({sprint}) => {
    if (!sprint.isDataUploaded) {return null}
    const {name,startDate,endDate} = sprint;
    return (
        <div className="header">
            <div className="title-bar"></div>
            <div className="app-bar">
                <div className="sprint-name">{name}</div>
                <div className="sprint-date">{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</div>
                <div className="expired-label">has already expired</div>
            </div>
        </div>
    )
} 

const mapStateToProps = createStructuredSelector({
    sprint: selectSprint
})


export default connect(mapStateToProps)(Header);