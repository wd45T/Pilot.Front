import React from 'react';
import { Observer } from 'mobx-react';

const ObservedCell = ({ rowData, dataKey }) => (
    <Observer>{() => (rowData[dataKey] == null ? '' : String(rowData[dataKey]))}</Observer>
);

export default ObservedCell;
