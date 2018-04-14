import React from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';

const App = ({ children }) =>
    <div className="app-container" id="app-container">
        {children}
    </div>

App.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
};

export default App;