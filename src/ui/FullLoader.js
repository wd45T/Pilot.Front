import React from 'react';
import { Spin } from 'antd';

const style = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  justifyContent: 'center'
};

const transparentStyle = {
  ...style,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,.1)',
  zIndex: 5
};

const Loader = ({ transparent = false }) => (
  <div style={transparent ? transparentStyle : style}>
    <Spin size="large" />
  </div>
);

export default Loader;
