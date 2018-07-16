import React, { Component } from 'react';
import { CenteredText, FullLoader } from 'ui';
import { AutoSizer, Table, Column } from 'react-virtualized';
import { Observer } from 'mobx-react';
import BaseTableStore from './BaseTableStore';

class BaseTable extends Component {
    static defaultProps = {
        store: new BaseTableStore(),
        rowIsSelected: () => false,
        columns: [],
        tableRef: () => false,
        notFoundText: 'Не найдено записей'
    };

    componentDidMount() {
        this.props.store.loadList();
    }

    getRowClassName = ({ index }) => {
        // Если заголовок
        if (index < 0) return '';
        const row = this.rowGetter({ index });
        // Если не нашли строчку
        if (!row) return '';
        // Пусть родитель скажет нужно ли выделять
        return this.props.rowIsSelected(row) ? 'select' : '';
    };

    rowGetter = ({ index }) => this.props.store.list[index];

    render() {
        const { store, columns, tableRef, notFoundText, ...tableProps } = this.props;

        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Observer>
                        {() => (
                            <Table
                                ref={tableRef}
                                className="app-table"
                                height={height}
                                width={width}
                                headerHeight={45}
                                rowHeight={45}
                                rowCount={store.list.length}
                                rowGetter={this.rowGetter}
                                rowClassName={this.getRowClassName}
                                rowRenderer={this.rowRender}
                                noRowsRenderer={() => (
                                    <Observer>
                                        {() =>
                                            store.loader.isLoading ? (
                                                <FullLoader transparent />
                                            ) : (
                                                <CenteredText>{notFoundText}</CenteredText>
                                            )
                                        }
                                    </Observer>
                                )}
                                {...tableProps}
                            >
                                {columns.map((column) => (
                                    <Column
                                        key={column.label}
                                        width={100}
                                        flexGrow={1}
                                        {...column}
                                    />
                                ))}
                            </Table>
                        )}
                    </Observer>
                )}
            </AutoSizer>
        );
    }
}

export default BaseTable;
