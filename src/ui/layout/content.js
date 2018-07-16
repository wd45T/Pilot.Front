import React from 'react';

const Content = ({ children, innerRef, className = '', style = {} }) => (
    <div ref={innerRef} className={`page-content ${className || ''}`} style={style}>
        {children}
    </div>
);

export default Content;
