import React from 'react';
import { Panel, Content } from 'ui/layout';
import { CenteredText } from 'ui';
import { Button, Spin } from 'antd';
import { observer, Observer, inject } from 'mobx-react';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader';
import { Table, Column, defaultRowRenderer } from 'react-virtualized/dist/es/Table';

import withModal from 'utils/withModal';
import Loader from 'ui/FullLoader';
import FilterModal from './FilterModal';
import DetailsModal from './DetailsModal';
import PassMapStore from './models/PassMapStore';
// import { ResizableColumnsTable } from 'features/resizable-columns';
import { openSaveDialog } from 'utils/file';

import './style.less';

class PassMap extends React.Component {
    // table = null;
    // infiniteLoader = null;

    // constructor(props) {
    //     super(props);
    //     this.store = new PassMapStore(props.passMapFilter);

    //     this.state = {
    //         columnsWidth: {}
    //     };
    // }

    // componentDidMount() {
    //     if (!this.store.filter.isEmpty) {
    //         // Если сохранен фильтр - то загрузим данные
    //         this.store.loadPassListKeys();
    //     }
    // }

    // openFilterModal = () =>
    //     this.props.openModal({
    //         title: 'Фильтр списка проходов',
    //         body: (
    //             <FilterModal
    //                 stations={this.store.stations}
    //                 filterData={this.store.filter.raw}
    //                 loadStations={() => this.store.loadStationsTree()}
    //                 updateFilter={this.reloadByFilter}
    //                 close={this.props.closeModal}
    //             />
    //         ),
    //         wrapClassName: 'app-modal__with-buttons',
    //         width: 620,
    //         maskClosable: false,
    //         // Отключаем дефолтные кнопки, они есть у формы
    //         footer: null
    //     });

    // async showPassInfo(data) {
    //     const { data: result } = await this.store.getPassDetailsById(data.id);
    //     if (result.status !== -1) {
    //         this.props.openModal({
    //             title: 'Информация о проходе',
    //             body: <DetailsModal {...result.data} />,
    //             okText: 'Просмотр по Fan ID',
    //             cancelText: 'Закрыть',
    //             onOk: () => this.props.history.push(`/pass-map/by-fan/${result.data.markId}`)
    //         });
    //     }
    // }

    // exportExcel = async () => {
    //     this.store.setIsExporting(true);
    //     try {
    //         const { data } = await this.store.getExcelBlob();
    //         if (data.status === -1) return;

    //         openSaveDialog(data, 'Отчет по проходам.xlsx');
    //     } finally {
    //         this.store.setIsExporting(false);
    //     }
    // };

    // componentWillUnmount() {
    //     this.store.cancelSendingRequests();
    // }

    // rowGetter = ({ index }) => this.store.passList[index];

    // sort = ({ sortBy, sortDirection }) =>
    //     this.store.sortPassList(sortBy, sortDirection).then(this.resetTableView);

    // resetTableView = () => {
    //     if (this.infiniteLoader) this.infiniteLoader.resetLoadMoreRowsCache(true);
    //     if (this.table) this.table.scrollToPosition(0);
    // };

    // // Список id, которые улетели в запросе но еще не получили ответ
    // idsLoadQuee = new Map();

    // isRowLoaded = ({ index }) => {
    //     const item = this.store.passList[index];
    //     return item && (item.isLoaded || this.idsLoadQuee.has(item.id));
    // };

    // loadMoreRows = ({ startIndex, stopIndex }) => {
    //     const { passList } = this.store;
    //     const ids = [];
    //     for (let i = startIndex; i <= stopIndex; i += 1) {
    //         if (passList[i] && !this.isRowLoaded({ index: i })) {
    //             ids.push(passList[i].id);
    //             this.idsLoadQuee.set(passList[i].id, true);
    //         }
    //     }
    //     return ids.length > 0
    //         ? this.store.loadMorePassListByIds(ids).then(() => {
    //               // Раз они выполнились, почистим их из очереди
    //               ids.forEach((id) => {
    //                   this.idsLoadQuee.delete(id);
    //               });
    //           })
    //         : Promise.resolve();
    // };

    // reloadByFilter = (filter) => {
    //     this.store.updatePassListByFilter(filter).then(this.resetTableView);
    // };

    // rowRender = (props) => {
    //     if (this.isRowLoaded(props) && !this.idsLoadQuee.has(props.rowData.id)) {
    //         return defaultRowRenderer(props);
    //     }
    //     // Иначе надо нарисовать строчку с загрузкой
    //     return (
    //         <div className={`${props.className} row-loading`} key={props.index} style={props.style}>
    //             <Spin />
    //         </div>
    //     );
    // };

    // handleColumnResize = ({ dataKey, width }) => {
    //     this.setState({
    //         columnsWidth: {
    //             ...this.state.columnsWidth,
    //             [dataKey]: width
    //         }
    //     });
    // };

    // get columns() {
    //     const columns = [
    //         {
    //             label: 'Метка',
    //             dataKey: 'markId',
    //             disableSort: true,
    //             resizable: true
    //         },
    //         {
    //             label: 'Дата прохода',
    //             dataKey: 'passDate',
    //             resizable: true
    //         },
    //         {
    //             label: 'Ветка',
    //             dataKey: 'branchName',
    //             resizable: true
    //         },
    //         {
    //             label: 'Станция',
    //             dataKey: 'stationName',
    //             resizable: true
    //         },
    //         {
    //             label: 'Вестибюль',
    //             dataKey: 'vestibuleName',
    //             resizable: true
    //         }
    //     ];

    //     columns.forEach((cl) => {
    //         cl.key = cl.dataKey;
    //         // cl.flexGrow = 1;
    //         cl.width = 200;
    //         cl.disableSort = this.store.isLoading || this.store.listIsEmpty;
    //     });

    //     return columns;
    // }

    // renderTable() {
    //     return (
    //         <AutoSizer>
    //             {({ height, width }) => (
    //                 <Observer>
    //                     {() => (
    //                         <InfiniteLoader
    //                             ref={(ref) => {
    //                                 this.infiniteLoader = ref;
    //                             }}
    //                             isRowLoaded={this.isRowLoaded}
    //                             loadMoreRows={this.loadMoreRows}
    //                             rowCount={this.store.listCount}
    //                             minimumBatchSize={15}
    //                         >
    //                             {({ onRowsRendered, registerChild }) => (
    //                                 <Observer>
    //                                     {() => (
    //                                         <ResizableColumnsTable
    //                                             ref={(ref) => {
    //                                                 this.table = ref;
    //                                                 registerChild(ref);
    //                                             }}
    //                                             className="app-table"
    //                                             height={height}
    //                                             width={width}
    //                                             onRowsRendered={onRowsRendered}
    //                                             rowRenderer={this.rowRender}
    //                                             headerHeight={40}
    //                                             rowHeight={40}
    //                                             rowCount={this.store.listCount}
    //                                             rowGetter={this.rowGetter}
    //                                             sortBy={this.store.filter.orderBy}
    //                                             sortDirection={this.store.filter.sortDirection}
    //                                             sort={this.sort}
    //                                             onRowDoubleClick={({ rowData }) =>
    //                                                 this.showPassInfo(rowData)
    //                                             }
    //                                             noRowsRenderer={() =>
    //                                                 this.store.isLoading ? (
    //                                                     <Loader transparent />
    //                                                 ) : (
    //                                                     <CenteredText>
    //                                                         Не найдено проходов по значению фильтра
    //                                                     </CenteredText>
    //                                                 )
    //                                             }
    //                                             columns={this.columns}
    //                                         />
    //                                     )}
    //                                 </Observer>
    //                             )}
    //                         </InfiniteLoader>
    //                     )}
    //                 </Observer>
    //             )}
    //         </AutoSizer>
    //     );
    // }

    // render() {
    //     const { listIsEmpty, isLoading, filter } = this.store;
    //     const content = filter.isEmpty ? (
    //         <CenteredText>Заполните фильтр для просмотра списка</CenteredText>
    //     ) : (
    //         this.renderTable()
    //     );

    //     return (
    //         <React.Fragment>
    //             <Panel>
    //                 <Button icon="filter" type="primary" onClick={this.openFilterModal}>
    //                     Фильтр
    //                 </Button>
    //                 <Button
    //                     icon="file-excel"
    //                     type="primary"
    //                     loading={this.store.isExporting}
    //                     disabled={listIsEmpty || isLoading || filter.isEmpty}
    //                     onClick={this.exportExcel}
    //                 >
    //                     Экспорт
    //                 </Button>
    //             </Panel>
    //             <Content>{content}</Content>
    //         </React.Fragment>
    //     );
    // }
}
export { PassMap };
export default withModal(inject('passMapFilter')(observer(PassMap)));
