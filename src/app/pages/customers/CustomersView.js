import React, { Component } from 'react';
import BaseTable from 'utils/BaseTable/BaseTable';
import { Panel, Content } from 'ui/layout';
import withModal from 'utils/withModal';
import { Observer } from 'mobx-react';
import { Button, Modal } from 'antd';

import CustomersStore from './CustomersStore';
import CustomerEditor from './CustomerEditor';

const ButtonGroup = Button.Group;

@withModal
class CustomersView extends Component {
    store = new CustomersStore();

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
            { dataKey: 'fullName', label: 'Наименование' },
            {
                dataKey: 'typeEnterprise',
                label: 'Тип',
            },
            {
                dataKey: 'phoneFax',
                label: 'Телефон/факс',
            },
            {
                dataKey: 'email',
                label: 'Эл. адрес',
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
                        onClick={() => this.openCustomerModal(rowData)}
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
            title: 'Удалить выбранного клиента?',
            okText: 'Да',
            cancelText: 'Нет',
            // onOk: () => this.store.deleteProcess(rowData),
        });

    onRowDoubleClick = ({ rowData }) => this.openCustomerModal(rowData);

    openCustomerModal = async (data) => {
        let title = 'Создание';
        let onOk = (p) => this.store.addCustomer(p);
        let customerDetailData = {};

        if (data) {
            title = 'Редактирование';
            onOk = (p) => this.store.updateCustomer(p);
            customerDetailData = await this.store.getCustomer(data.id);
        }
        this.props.openModal({
            title: `${title} клиента`,
            body: (
                <CustomerEditor
                    close={this.props.closeModal}
                    data={customerDetailData}
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
                            this.openCustomerModal();
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

export default CustomersView;
