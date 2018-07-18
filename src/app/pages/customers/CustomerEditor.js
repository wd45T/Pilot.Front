import React, { Component, Fragment } from 'react';
import InputNumberFormField from 'ui/FormFields/InputNumberFormField';
import DatePickerFormField from 'ui/FormFields/DatePickerFormField';
import TimePickerFormField from 'ui/FormFields/TimePickerFormField';
import SelectFormField from 'ui/FormFields/SelectFormField';
import InputFormField from 'ui/FormFields/InputFormField';
import { Form, Row, Col, Button, message, Divider } from 'antd';

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
class CustomerEditor extends Component {
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

    render() {
        const { close, form, data } = this.props;
        const { getFieldDecorator } = form;
        const { name, fio, position, pasport, inn, kpp, ogrn, bik } = data;
        const { typeId } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} layout="vertical">
                <Row gutter={24}>
                    <Col span={12}>
                        <InputFormField
                            form={form}
                            label="Наименование"
                            initialValue={name}
                            dataKey="name"
                            formItemLayout={FORM_ITEM_LAYOUT}
                            validationRules={VALIDATION_RULES}
                        />
                        <InputFormField
                            form={form}
                            label="ФИО руководителя"
                            initialValue={fio}
                            dataKey="fio"
                            formItemLayout={FORM_ITEM_LAYOUT}
                            validationRules={VALIDATION_RULES}
                        />
                    </Col>
                    <Col span={12}>
                        <SelectFormField
                            form={form}
                            label="Тип клиента"
                            dataKey="typeId"
                            options={[
                                { id: 'ul', name: 'ЮЛ' },
                                { id: 'ip', name: 'ИП' },
                                { id: 'fl', name: 'ФЛ' },
                            ]}
                            optionLabel="name"
                            initialValue={typeId}
                            validationRules={VALIDATION_RULES}
                            formItemLayout={FORM_ITEM_LAYOUT}
                            onChange={(value) =>
                                this.changeFieldHandler('typeId', value)
                            }
                        />
                        <InputFormField
                            form={form}
                            label="Должность руководителя"
                            initialValue={position}
                            dataKey="position"
                            formItemLayout={FORM_ITEM_LAYOUT}
                            validationRules={VALIDATION_RULES}
                        />
                    </Col>
                </Row>
                {typeId === 'fl' && (
                    <Row gutter={24}>
                        <Col span={12}>
                            <InputFormField
                                form={form}
                                label="Паспорт"
                                initialValue={pasport}
                                dataKey="pasport"
                                formItemLayout={FORM_ITEM_LAYOUT}
                                validationRules={VALIDATION_RULES}
                            />
                        </Col>
                    </Row>
                )}
                <Divider className="schedule__divider" orientation="left">
                    Контакты
                </Divider>
                <Row gutter={24}>
                    <Col span={8}>
                        <InputFormField
                            form={form}
                            label="ИНН"
                            initialValue={inn}
                            dataKey="inn"
                            formItemLayout={FORM_ITEM_LAYOUT}
                            validationRules={VALIDATION_RULES}
                        />
                    </Col>
                    <Col span={8}>
                        <InputFormField
                            form={form}
                            label="КПП"
                            initialValue={kpp}
                            dataKey="kpp"
                            formItemLayout={FORM_ITEM_LAYOUT}
                            validationRules={VALIDATION_RULES}
                        />
                    </Col>
                    <Col span={8}>
                        <InputFormField
                            form={form}
                            label="ОГРН"
                            initialValue={ogrn}
                            dataKey="ogrn"
                            formItemLayout={FORM_ITEM_LAYOUT}
                            validationRules={VALIDATION_RULES}
                        />
                    </Col>
                </Row>
                {(typeId === 'ul' || typeId === 'ip') && (
                    <Fragment>
                        <Divider
                            className="schedule__divider"
                            orientation="left"
                        >
                            Банк
                        </Divider>
                        <Row gutter={24}>
                            <Col span={24}>
                                <InputFormField
                                    form={form}
                                    label="БИК"
                                    initialValue={bik}
                                    dataKey="bik"
                                    formItemLayout={FORM_ITEM_LAYOUT}
                                    validationRules={VALIDATION_RULES}
                                />
                            </Col>
                        </Row>
                    </Fragment>
                )}
                <div className="ant-modal-footer">
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                    <Button onClick={close}>Отмена</Button>
                </div>
            </Form>
        );
    }
}

export default CustomerEditor;
