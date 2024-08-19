import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from "../../../types/OrganizationsTypes.ts";
import {Employee} from "../../../types/EmployeesTypes.ts";

interface OrganizationState {
    organizations: Organization[];
    editingOrganization: Organization | null;
}

const initialState: OrganizationState = {
    organizations: [],
    editingOrganization: null,
};

const organizationsSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        setOrganizations(state, action: PayloadAction<Organization[]>) {
            state.organizations = action.payload;
        },
        addOrganization(state, action: PayloadAction<Organization>) {
            state.organizations.push(action.payload);
        },
        editOrganization(state, action: PayloadAction<Organization>) {
            const index = state.organizations.findIndex((organization) => organization.id === action.payload.id);
            if (index !== -1) {
                state.organizations[index] = action.payload;
            }
        },
        deleteOrganization(state, action: PayloadAction<number>) {
            state.organizations = state.organizations.filter((organization) => organization.id !== action.payload);
        },
        setEditingOrganization(state, action: PayloadAction<Organization | null>) {
            state.editingOrganization = action.payload;
        },
        addEmployee(state, action: PayloadAction<{ organizationId: number; employee: Employee }>) {
            const index = state.organizations.findIndex((organization) => organization.id === action.payload.organizationId);
            if (index !== -1) {
                state.organizations[index].employees.push(action.payload.employee);
            }
        },
        editEmployee(state, action: PayloadAction<{ organizationId: number; employeeId: number; updates: Partial<Employee> }>) {
            const organizationIndex = state.organizations.findIndex((organization) => organization.id === action.payload.organizationId);
            if (organizationIndex !== -1) {
                const employeeIndex = state.organizations[organizationIndex].employees.findIndex((employee) => employee.employee_id === action.payload.employeeId);
                if (employeeIndex !== -1) {
                    state.organizations[organizationIndex].employees[employeeIndex] = { ...state.organizations[organizationIndex].employees[employeeIndex], ...action.payload.updates };

                }
            }
        },
        deleteEmployee(state, action: PayloadAction<{ organizationId: number; employeeId: number }>) {
            const organizationIndex = state.organizations.findIndex((organization) => organization.id === action.payload.organizationId);
            if (organizationIndex !== -1) {
                state.organizations[organizationIndex].employees = state.organizations[organizationIndex].employees.filter((employee) => employee.employee_id !== action.payload.employeeId);
            }
        },
        saveData(state){
            localStorage.setItem('data', JSON.stringify(state.organizations))
        }
    },
});

export const {
    setOrganizations,
    addOrganization,
    editOrganization,
    deleteOrganization,
    setEditingOrganization,
    addEmployee,
    editEmployee,
    deleteEmployee,
    saveData
} = organizationsSlice.actions;

export default organizationsSlice.reducer;