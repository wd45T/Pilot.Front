import React, { Component } from 'react';
import BaseTable from 'utils/BaseTable/BaseTable';
import { Panel, Content } from 'ui/layout';
import withModal from 'utils/withModal';
import { Observer } from 'mobx-react';
import { Button, Modal } from 'antd';

import DealsStore from './DealsStore';
import DealEditor from './DealEditor';

const ButtonGroup = Button.Group;

@withModal
class DealsView extends Component {
    store = new DealsStore();

    rowGetter = ({ index }) => this.store.sortedList[index];

    get columns() {
        return [
            {
                dataKey: 'editor',
                label: '',
                width: 80,
                flexGrow: 0,
                flexShrink: 0,
                cellRenderer: this.controlsButtonRenderer,
            },
            { dataKey: 'dealName', label: 'Название сделки' },
            {
                dataKey: 'budget',
                label: 'Бюджет',
            },
            {
                dataKey: 'customerName',
                label: 'Заказчик',
            },
            {
                dataKey: 'stage',
                label: 'Этап',
            },
        ];
    }

    controlsButtonRenderer = ({ rowData }) => (
        <Observer>
            {() => (
                <ButtonGroup>
                    <Button
                        icon="edit"
                        onDoubleClick={(e) => e.stopPropagation()}
                        onClick={() => this.openDealModal(rowData)}
                        title="Редактировать"
                    />
                    <Button
                        type="danger"
                        icon="delete"
                        onDoubleClick={(e) => e.stopPropagation()}
                        onClick={this.openDeleteConfirmationModal(rowData)}
                        title="Удалить"
                    />
                </ButtonGroup>
            )}
        </Observer>
    );

    openDeleteConfirmationModal = (rowData) => () =>
        Modal.confirm({
            title: 'Удалить выбранную сделку?',
            okText: 'Да',
            cancelText: 'Нет',
            // onOk: () => this.store.deleteProcess(rowData),
        });

    onRowDoubleClick = ({ rowData }) => this.openDealModal(rowData);

    openDealModal = async (data) => {
        let title = 'Создание';
        let onOk = (p) => this.store.addDeal(p);
        let dealDetailData = {};

        if (data) {
            title = 'Редактирование';
            onOk = (p) => this.store.updateDeal(p);
            dealDetailData = await this.store.getDeal(data.id);
        }
        this.props.openModal({
            title: `${title} сделки`,
            body: (
                <DealEditor
                    close={this.props.closeModal}
                    data={dealDetailData}
                    onOk={onOk}
                    submitButtonText="Сохранить"
                />
            ),
            className: 'custumer__modal modal-size__m',
            footer: null,
        });
    };

    render() {
        return (
            <React.Fragment>
                <Panel>
                    <Button
                        type="primary"
                        icon="plus"
                        onClick={() => {
                            this.openDealModal();
                        }}
                    />
                </Panel>
                <Content>
                    <Observer>
                        {() => (
                            <BaseTable
                                store={this.store}
                                columns={this.columns}
                                sort={this.sort}
                                sortBy={this.store.listSorter.by}
                                sortDirection={this.store.listSorter.direction}
                                rowGetter={this.rowGetter}
                                rowCount={this.store.sortedList.length}
                                onRowDoubleClick={this.onRowDoubleClick}
                                notFoundContent={
                                    this.store.nameFilter !== ''
                                        ? 'Не найдено'
                                        : 'Список пуст'
                                }
                            />
                        )}
                    </Observer>
                </Content>
            </React.Fragment>
        );
    }
}

export default DealsView;
