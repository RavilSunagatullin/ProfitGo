import React from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {Employee} from "../types/EmployeesTypes.ts";


interface OrganizationModalProps {
    visible: boolean;
    employee?: Employee;
    onCancel: () => void;
    onSubmit: (data) => void;
}

const EmployeeForm: React.FC<OrganizationModalProps> = ({ visible, employee, onCancel, onSubmit }) => {
    const [form] = Form.useForm();
    // Я долго искал решение как использовать react-hook-form с antd
    // Я не нашел, можно в обратной связи сказать как это делаеться? Спасибо ;)
    // P.S WebStorm Ругаеться на код ниже незнаю почему
    const name = Form.useWatch('name', form);
    const department = Form.useWatch('department', form);
    const position = Form.useWatch('position', form);
    const handleSubmit = () => {
        onSubmit({
            name, department, position
        })
    }

    React.useEffect(()=> {
        if(employee) {
            return form.setFieldsValue(employee);
        }
        form.setFieldsValue({
            name: '',
            department:'',
            position:''
        });
    }, [employee, form])

    return (
        <Modal
            title={employee ? 'Редактировать пользователя' : 'Добавить пользователя'}
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form onFinish={handleSubmit} layout="vertical"  form={form} initialValues={employee}>
                <Form.Item label="Название организации" name='name' >
                    <Input />
                </Form.Item>
                <Form.Item label="Департамент" name='department'>
                    <Input />
                </Form.Item>
                <Form.Item label="Позиция" name='position'>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Сохранить</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployeeForm;