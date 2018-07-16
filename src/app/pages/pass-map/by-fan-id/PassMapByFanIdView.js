import React from 'react';
import { Panel, Content } from 'ui/layout';
import { CenteredText } from 'ui';
import { Spin, Button } from 'antd';
import { observer, Observer } from 'mobx-react';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader';
import { Table, Column, defaultRowRenderer } from 'react-virtualized/dist/es/Table';

import Loader from 'ui/FullLoader';
import Store from './models/ListStore';

const EmptyList = () => <CenteredText>Не найдено записей</CenteredText>;

@observer
class PassMapByFanIdView extends React.Component {
    store = new Store(this.props.match.params.fanId);

    table = null;
    infiniteLoader = null;
    link = null;

    componentDidMount() {
        this.store.loadListKeys();
    }

    rowGetter({ index }) {
        return this.store.list[index];
    }

    // Список id, которые улетели в запросе но еще не получили ответ
    idsLoadQuee = new Map();

    isRowLoaded({ index }) {
        const item = this.store.list[index];
        return item && (item.isLoaded || this.idsLoadQuee.has(item.id));
    }

    loadMoreRows({ startIndex, stopIndex }) {
        const { list } = this.store;
        const ids = [];
        for (let i = startIndex; i <= stopIndex; i += 1) {
            const item = list[i];
            if (item && !this.isRowLoaded({ index: i })) {
                ids.push(item.id);
                this.idsLoadQuee.set(item.id, true);
            }
        }
        return ids.length > 0
            ? this.store.loadMoreByIds(ids).then(() => {
                  // Раз они выполнились, почистим их из очереди
                  ids.forEach((id) => {
                      this.idsLoadQuee.delete(id);
                  });
              })
            : Promise.resolve();
    }

    rowRender(props) {
        if (this.isRowLoaded(props) && !this.idsLoadQuee.has(props.rowData.id)) {
            return defaultRowRenderer(props);
        }
        // Иначе надо нарисовать строчку с загрузкой
        return (
            <div className={`${props.className} row-loading`} key={props.index} style={props.style}>
                <Spin />
            </div>
        );
    }

    goBack() {
        this.props.history.push('/pass-map');
    }

    componentWillUnmount() {
        this.store.cancelSendingRequests();
    }
    renderPanel() {
        return (
            <Button icon="arrow-left" type="primary" onClick={() => this.goBack()}>
                Вернуться к списку всех проходов
            </Button>
        );
    }

    get columns() {
        return [
            {
                label: 'Метка',
                dataKey: 'markId',
                width: 100,
                flexShrink: 0
            },
            {
                label: 'Дата прохода',
                dataKey: 'passDate',
                flexShrink: 0,
                flexGrow: 0
            },
            {
                label: 'Ветка',
                dataKey: 'branchName'
            },
            {
                label: 'Станция',
                dataKey: 'stationName'
            },
            {
                label: 'Вестибюль',
                dataKey: 'vestibuleName'
            }
        ];
    }

    render() {
        return (
            <React.Fragment>
                <Panel>{this.renderPanel()}</Panel>
                <Content>
                    <AutoSizer>
                        {({ height, width }) => (
                            <Observer>
                                {() => (
                                    <InfiniteLoader
                                        ref={(ref) => {
                                            this.infiniteLoader = ref;
                                        }}
                                        isRowLoaded={(props) => this.isRowLoaded(props)}
                                        loadMoreRows={(props) => this.loadMoreRows(props)}
                                        rowCount={this.store.listCount}
                                        minimumBatchSize={15}
                                    >
                                        {({ onRowsRendered, registerChild }) => (
                                            <Observer>
                                                {() => (
                                                    <Table
                                                        ref={(ref) => {
                                                            this.table = ref;
                                                            registerChild(ref);
                                                        }}
                                                        className="app-table"
                                                        height={height}
                                                        width={width}
                                                        onRowsRendered={onRowsRendered}
                                                        rowRenderer={(props) =>
                                                            this.rowRender(props)
                                                        }
                                                        headerHeight={40}
                                                        rowHeight={40}
                                                        rowCount={this.store.listCount}
                                                        rowGetter={(data) => this.rowGetter(data)}
                                                        // sortBy={this.store.filter.orderBy}
                                                        // sortDirection={this.store.filter.sortDirection}
                                                        // sort={this.sort}
                                                        noRowsRenderer={
                                                            this.store.isLoading
                                                                ? () => <Loader transparent />
                                                                : EmptyList
                                                        }
                                                    >
                                                        {this.columns.map((column) => (
                                                            <Column
                                                                key={column.dataKey}
                                                                width={200}
                                                                flexGrow={1}
                                                                {...column}
                                                            />
                                                        ))}
                                                    </Table>
                                                )}
                                            </Observer>
                                        )}
                                    </InfiniteLoader>
                                )}
                            </Observer>
                        )}
                    </AutoSizer>
                </Content>
            </React.Fragment>
        );
    }
}

export default PassMapByFanIdView;
