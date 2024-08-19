import {Employee} from "./EmployeesTypes.ts";

export interface Organization {
    id:number;
    key:number;
    name: string;
    address: string;
    mobile: string;
    website: string;
    employees: Employee[];
}