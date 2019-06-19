// src/components/Profile.js
import React from 'react';
import PropTypes from 'prop-types';

const propsTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  label: PropTypes.string,
};

const Profile = ({ onClick, label , selected }) => {
    const classes = selected  ? 'bold' : '';

    return (
        <li onClick = {onClick} className ={classes}>
            { label }
        </li>
    )
}

Profile.propsTypes = propsTypes;
export default Profile;