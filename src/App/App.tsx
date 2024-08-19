
import {Layout} from "antd";
import IndexPage from "../Pages/IndexPage.tsx";
import {createBrowserRouter, RouterProvider, useRoutes} from "react-router-dom";
import React from "react";
import {Organization} from "../types/OrganizationsTypes.ts";
import localData from "../local-data/dataSource.json";
import {Employee} from "../types/EmployeesTypes.ts";
import {setOrganizations} from "./store/slices/OrganizationsSlice.ts";
import {useDispatch} from "react-redux";


const router = [
    {
        path: "/",
        element: <IndexPage/>,
    },
    {
        path: "contacts/:contactId",
        element: <>contact</>,
    },
];



function App() {

    let components = useRoutes(router)
    return (
        <Layout style={{ padding: 20, backgroundColor:'#fafafa', height:'100vh' }}>
            {components}
        </Layout>
    );
}

export default App
