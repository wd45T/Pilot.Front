import React, { Component } from 'react';
import { Panel, Content } from 'ui/layout';
import { Button } from 'antd';
import BaseTable from 'utils/BaseTable/BaseTable';
import CustomersStore from './CustomersStore';
import { Observer } from 'mobx-react';

class CustomersView extends Component {
  store = new CustomersStore();

  rowGetter = ({ index }) => this.store.sortedList[index];

  get columns() {
    return [
      {
        label: '',
        dataKey: 'edit-btn',
        width: 35,
        flexShrink: 0,
        flexGrow: 0,
        disableSort: true,
        cellRenderer: this.editButtonRenderer,
      },
      {
        label: '',
        dataKey: 'delete-btn',
        width: 35,
        flexShrink: 0,
        flexGrow: 0,
        disableSort: true,
        cellRenderer: this.deleteButtonRenderer,
      },
      { dataKey: 'fullName', label: 'Наименование' },
      {
        dataKey: 'typeEnterprise',
        label: 'Тип',
      },
      {
        dataKey: 'managerName',
        label: 'ФИО руководителя',
      },
      {
        dataKey: 'inn',
        label: 'ИНН',
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

  editButtonRenderer = (data) => {
    this.openScheduleModal(data);
  };

  deleteButtonRenderer = () => {
    console.log('deleteButtonRenderer');
  };

  onRowDoubleClick = ({ rowData }) => this.openScheduleModal(rowData);

  openScheduleModal = () => {
    console.log('openScheduleModal');
  };

  render() {
    return (
      <React.Fragment>
        <Panel>
          <Button type="primary" icon="plus" />
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
                  this.store.nameFilter !== '' ? 'Не найдено' : 'Список пуст'
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
