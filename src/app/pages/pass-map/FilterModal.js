import React from 'react';
import { Form, DatePicker, Button, TreeSelect } from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const zeroTime = moment('00:00:00', 'HH:mm:ss');
const defaultValueZeroTime = {
    defaultValue: [zeroTime, zeroTime]
};

// Кнопки перенесены внутрь формы для более удобного управления
// из-за этого может отображаться криво
// есть другой пример из документации с формой в модалке https://ant.design/components/form/#components-form-demo-form-in-modal
@Form.create({
    mapPropsToFields(props) {
        const { periodStart, periodEnd, idData } = props.filterData;
        return {
            dateRange: Form.createFormField({
                value: [periodStart, periodEnd]
            }),
            nodeData: Form.createFormField({
                value: idData.slice()
            })
        };
    }
})
@observer
class FilterModal extends React.Component {
    componentDidMount() {
        this.props.loadStations();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { dateRange = [null, null], nodeData } = values;
                const [dateStart, dateEnd] = dateRange;
                this.props.updateFilter({ nodeData, dateStart, dateEnd });
                this.props.close();
            }
        });
    };

    filterStations = (search, { props }) =>
        props.title.toLowerCase().includes(search.toLowerCase());

    render() {
        const { close, stations } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...this.formItemLayout} label="Временной интервал">
                    {getFieldDecorator('dateRange')(
                        <RangePicker
                            className="full-width"
                            showTime={defaultValueZeroTime}
                            format="DD.MM.YYYY HH:mm:ss"
                        />
                    )}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    className="station-select__field"
                    label="Станция"
                >
                    {getFieldDecorator('nodeData', this.stationFieldValidation)(
                        <TreeSelect
                            showSearch
                            filterTreeNode={this.filterStations}
                            dropdownStyle={{ maxHeight: 500, overflow: 'auto' }}
                            treeCheckable={true}
                            treeDefaultExpandAll
                            showCheckedStrategy={SHOW_PARENT}
                            treeData={stations.slice()}
                        />
                    )}
                </FormItem>
                <div className="ant-modal-footer">
                    <Button type="primary" htmlType="submit">
                        Применить
                    </Button>
                    <Button onClick={close}>Отмена</Button>
                </div>
            </Form>
        );
    }

    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };

    stationFieldValidation = {
        rules: [
            {
                required: true,
                message: 'Пожалуйста, выберите станцию'
            }
        ]
    };
}

export default FilterModal;
