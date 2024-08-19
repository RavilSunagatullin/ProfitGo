import React from 'react';
import {Button, Flex, TableColumnsType} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import TableComponent from "../Components/TableComponent.tsx";
import localData from '../local-data/dataSource.json'
import {Organization} from "../types/OrganizationsTypes.ts";
import {Employee} from "../types/EmployeesTypes.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    addEmployee,
    addOrganization,
    deleteEmployee, deleteOrganization,
    editEmployee,
    editOrganization, saveData,
    setOrganizations
} from "../App/store/slices/OrganizationsSlice.ts";
import {RootState} from "../App/store/store.ts";
import OrganizationForm from "../Components/OrganizationForm.tsx";
import EmployeeForm from "../Components/EmployeeForm.tsx";

export default  function IndexPage() {
    const [organizationModalVisible, setOrganizationModalVisible] = React.useState(false);
    const [employeeModalVisible, setEmployeeModalVisible] = React.useState(false)
    const [editedOrganization, setEditedOrganization] = React.useState()
    const [currentOrgID, setCurrentOrgID] = React.useState()
    const [editedEmployee, setEditedEmployee] = React.useState()

    React.useEffect(()=>console.log(editedOrganization), [editedOrganization])

    const dispatch = useDispatch();
    const organizations = useSelector((state:RootState) => state.organizations);
    React.useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'))
        if(storedData){
            dispatch(setOrganizations(storedData));
        }
        else {
            dispatch(setOrganizations(localData));
        }
    }, []);

    const handleAddOrganization = (data) => {
        const id = Date.now()
        const newOrganization:Organization =   {
                id: id,
                name: data.name,
                address: data.address,
                mobile: data.mobile,
                website: data.website,
                employees: [],
                key: organizations.organizations.length + 1
            }
        dispatch(addOrganization(newOrganization));
        dispatch(saveData())

    };

    const handleAddEmployee = (data) => {
        const key = organizations.organizations.find(org => org.id === currentOrgID).employees.length + 1
        const newEmployee:Employee = {key: key.toString(), name: data.name, position:data.position, department: data.department, employee_id:Date.now(), organization_id:Number(currentOrgID)}
        dispatch(addEmployee({ organizationId:currentOrgID, employee: newEmployee}));
        dispatch(saveData())
    };
    const handleEditOrganization = (record) => {
        const newOrganization:Organization =   {
            id: editedOrganization.id,
            name: record.name,
            address: record.address,
            mobile: record.mobile,
            website: record.website,
            employees: editedOrganization.employees,
            key: editedOrganization.key
        }
        dispatch(editOrganization(newOrganization));
        dispatch(saveData())
    };

    const handleEditEmployee = (record) => {
        const newEmployee:Employee = {key: editedEmployee.key, name: record.name, position: record.position, department: record.department, employee_id:editedEmployee.employee_id, organization_id:editedEmployee.organization_id}
        dispatch(editEmployee({organizationId:editedEmployee.organization_id, employeeId:editedEmployee.employee_id, updates:newEmployee}));
        dispatch(saveData())
    };

    const handleDeleteEmployee = (record) => {
        const confirm = window.confirm('Delete employee')
        if(confirm){
            dispatch(deleteEmployee({ organizationId:record.organization_id, employeeId:record.employee_id }));
            dispatch(saveData())
        }
    };
    const handleDeleteOrganization = (record) => {
        const confirm = window.confirm('Delete organization')
        if(confirm){
            dispatch(deleteOrganization(record.id))
            dispatch(saveData())
        }
    }

    const handleSubmitOrganization = (data: Organization) => {
        setOrganizationModalVisible(false)
        setEditedOrganization(null)
        if(!editedOrganization){
           return handleAddOrganization(data)
        }
        handleEditOrganization(data)
    };

    function handleSubmitEmployee(data) {
        setEmployeeModalVisible(false)
        if(!editedEmployee){
            return handleAddEmployee(data)
        }
        handleEditEmployee(data)
    }

    const OrganizationColumns:TableColumnsType<Organization> = [
        {title: 'Компания', dataIndex: 'name', key: 'name'},
        {title: 'Адрес', dataIndex: 'address', key: 'address'},
        {title: 'Мобильный', dataIndex: 'mobile', key: 'mobile'},
        {title: 'Сайт',  key: 'website',
            render: (record) => {
                return <a href={record.website} target='_blank'>{record.website}</a>
            }},
        {
            title: 'Действия',
            key: 'operation',
            render: (record) => {
                return <Flex gap="small">
                    <Button onClick={() => {
                        setEditedOrganization(record)
                        setOrganizationModalVisible(true)
                    }} icon={<EditOutlined/>}/>
                    <Button onClick={() => handleDeleteOrganization(record)} icon={<DeleteOutlined/>} style={{borderColor:'red', color:'red'}}/>
                </Flex>
            }
        },
    ];

    const EmployeeColumns:TableColumnsType<Employee> = [
        { title: 'Имя', dataIndex: 'name', key: 'name' },
        { title: 'Должность', dataIndex: 'position', key: 'position' },
        { title: 'Отдел', dataIndex: 'department', key: 'department' },
        {
            title: 'Действия',
            key: 'operation',
            render: (record) => {
                return <Flex gap="small">
                    <Button onClick={() => {
                        setEditedEmployee(record)
                        setEmployeeModalVisible(true)
                    }} icon={<EditOutlined/>}/>
                    <Button onClick={() => handleDeleteEmployee(record)} icon={<DeleteOutlined/>} style={{borderColor:'red', color:'red'}}/>
                </Flex>
            },
        },
    ];

    const expandedRowRender = (record) => {
        const data = record.employees.map((employee, index) => ({
            key: index.toString(),
            name: employee.name,
            position: employee.position,
            department: employee.department,
            employee_id: employee.employee_id,
            organization_id:employee.organization_id
        }));
        return <TableComponent
            columns={EmployeeColumns}
            data={data}
            pagination={false}
            header={()=><Button onClick={()=> {
                setCurrentOrgID(record.id)
                setEmployeeModalVisible(true)
            }}>Добавить сотрудника</Button>}
        />;
    };


    return (
        <>
            <TableComponent
                columns={OrganizationColumns}
                expandable={{expandedRowRender, defaultExpandedRowKeys: ['0']}}
                data={organizations.organizations}
                pagination={false}
                header={()=><Button onClick={()=> {
                    setOrganizationModalVisible(true)
                }}>Добавить организацию</Button>}
            />
            <OrganizationForm visible={organizationModalVisible} onSubmit={handleSubmitOrganization}  onCancel={() => {
                setEditedOrganization(null);
                setOrganizationModalVisible(false)
            }} organization={editedOrganization || undefined}/>
        <EmployeeForm visible={employeeModalVisible} onCancel={()=> {
            setEmployeeModalVisible(false)
            setEditedEmployee(null)
        }} onSubmit={handleSubmitEmployee} employee={editedEmployee || null}/>
        </>
    );
}
