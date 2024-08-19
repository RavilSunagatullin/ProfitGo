import { configureStore } from '@reduxjs/toolkit'
import organizationsReducer from "./slices/OrganizationsSlice.ts";

export const store = configureStore({
    reducer: {
        organizations:organizationsReducer
    },
})

export type RootState = {
    organizations: ReturnType<typeof organizationsReducer>;
}

export type AppDispatch = typeof store.dispatch