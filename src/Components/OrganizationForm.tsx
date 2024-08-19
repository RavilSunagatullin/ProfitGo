import React from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {Organization} from "../types/OrganizationsTypes.ts";


interface OrganizationModalProps {
    visible: boolean;
    organization?: Organization;
    onCancel: () => void;
    onSubmit: (data) => void;
}

const OrganizationForm: React.FC<OrganizationModalProps> = ({ visible, organization, onCancel, onSubmit }) => {
    const [form] = Form.useForm();
    // Я долго искал решение как использовать react-hook-form с antd
    // Я не нашел, можно в обратной связи сказать как это делаеться? Спасибо ;)
    // P.S WebStorm Ругаеться на код ниже незнаю почему
    const name = Form.useWatch('name', form);
    const address = Form.useWatch('address', form);
    const mobile = Form.useWatch('mobile', form);
    const website = Form.useWatch('website', form);
    const handleSubmit = () => {
        onSubmit({
            name, address , mobile, website
        })
    }
    React.useEffect(()=> {
        if(organization) {
            return form.setFieldsValue(organization);
        }
        form.setFieldsValue({
            name: '',
            address: '',
            mobile: '',
            website: ''
        });
    }, [organization, form])
    return (
        <Modal
            title={organization ? 'Редактировать организацию' : 'Добавить организацию'}
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form onFinish={handleSubmit} layout="vertical"  form={form}>
                <Form.Item label="Название организации" name='name' >
                    <Input />
                </Form.Item>
                <Form.Item label="Адрес" name='address'>
                    <Input />
                </Form.Item>
                <Form.Item label="Мобильный" name='mobile'>
                    <Input/>
                </Form.Item>
                <Form.Item label="Сайт" name='website'>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Сохранить</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrganizationForm;