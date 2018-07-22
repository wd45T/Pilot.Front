import React, { Component } from 'react';
import InputNumberFormField from 'ui/FormFields/InputNumberFormField';
import DatePickerFormField from 'ui/FormFields/DatePickerFormField';
import TimePickerFormField from 'ui/FormFields/TimePickerFormField';
import SelectFormField from 'ui/FormFields/SelectFormField';
import InputFormField from 'ui/FormFields/InputFormField';
import { Form, Row, Col, Button, message, Dropdown, Icon, Menu } from 'antd';

const VALIDATION_RULES = [
    {
        required: true,
        message: 'Поле обязательно',
    },
];

const FORM_ITEM_LAYOUT = [
    {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    },
];

@Form.create()
class DealEditor extends Component {
    constructor(props) {
        super(props);
        const { typeId } = props.data;
        this.state = {
            typeId: typeId || '',
        };
    }

    changeFieldHandler = (fieldName, fieldValue) => {
        this.setState({
            [fieldName]: fieldValue,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, schdule) => {
            if (err) return;
            try {
                this.setState({ uploading: true });
                const { ...otherValue } = schdule;
                await this.props.onOk({
                    ...otherValue,
                    id: this.props.data ? this.props.data.id : undefined,
                });
                this.props.close();
            } catch (error) {
                this.setState({ uploading: false });
                message.error(error.message);
            }
        });
    };

    downloadMenu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1">
                <Icon type="user" />Договор
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="user" />Счета
            </Menu.Item>
            <Menu.Item key="3">
                <Icon type="user" />Проект
            </Menu.Item>
        </Menu>
    );

    handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };

    render() {
        const { close, form, data } = this.props;
        const { dealName, customerId, budget, stageId, objectId } = data;
        const { typeId } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} layout="vertical">
                <Row gutter={24}>
                    <Col span={12}>
                        <InputFormField
                            form={form}
                            label="Название"
                            initialValue={dealName}
                            dataKey="dealName"
                            formItemLayout={FORM_ITEM_LAYOUT}
                            validationRules={VALIDATION_RULES}
                        />
                        <SelectFormField
                            form={form}
                            label="Заказчик"
                            dataKey="customerId"
                            options={[
                                { id: '1', name: 'Заказчик1' },
                                { id: '2', name: 'Заказчик2' },
                                { id: '3', name: 'Заказчик3' },
                            ]}
                            optionLabel="name"
                            initialValue={customerId}
                            validationRules={VALIDATION_RULES}
                            formItemLayout={FORM_ITEM_LAYOUT}
                            onChange={(value) =>
                                this.changeFieldHandler('customerId', value)
                            }
                        />
                        <SelectFormField
                            form={form}
                            label="Объекты"
                            dataKey="objectId"
                            options={[
                                { id: '1', name: 'Объект1' },
                                { id: '2', name: 'Объект2' },
                                { id: '3', name: 'Объект3' },
                            ]}
                            optionLabel="name"
                            initialValue={objectId}
                            validationRules={VALIDATION_RULES}
                            formItemLayout={FORM_ITEM_LAYOUT}
                            onChange={(value) =>
                                this.changeFieldHandler('objectId', value)
                            }
                        />
                    </Col>
                    <Col span={12}>
                        <InputFormField
                            form={form}
                            label="Бюджет"
                            initialValue={budget}
                            dataKey="budget"
                            formItemLayout={FORM_ITEM_LAYOUT}
                            validationRules={VALIDATION_RULES}
                        />
                        <SelectFormField
                            form={form}
                            label="Этап"
                            dataKey="stageId"
                            options={[
                                { id: '1', name: 'Первичный контакт' },
                                { id: '2', name: 'Отправили документы' },
                                { id: '3', name: 'Выиграли' },
                                { id: '4', name: 'Заключили контракт' },
                                { id: '5', name: 'В работе' },
                                { id: '6', name: 'Оплатили' },
                            ]}
                            optionLabel="name"
                            initialValue={stageId}
                            validationRules={VALIDATION_RULES}
                            formItemLayout={FORM_ITEM_LAYOUT}
                            onChange={(value) =>
                                this.changeFieldHandler('stageId', value)
                            }
                        />
                    </Col>
                </Row>
                {/* <Divider className="schedule__divider" orientation="left">
                    Контакты
                </Divider> */}
                <div className="ant-modal-footer deal__modal-footer">
                    <Dropdown overlay={this.downloadMenu}>
                        <Button>
                            Скачать <Icon type="down" />
                        </Button>
                    </Dropdown>
                    <div className="control-buttons">
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                        <Button onClick={close}>Отмена</Button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default DealEditor;
