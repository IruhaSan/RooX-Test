import axios, { AxiosResponse } from "axios"

export type UserModel = {
    id?: number;
    name: string;
    username: string;
    email: string;
    address: {
        city: string;
        zipcode: string;
        street: string;
    }
    company: {
        name: string;
    }
    phone: string;
    website: string;
}

export type UserData = {
    name: string;
    addressCity: string;
    addressZipCode: string;
    addressStreet: string;
    email: string;
    phone: string;
    username: string;
    website: string;
    comment?: string;
}

export const getUsers = () => {
    return axios.get<any, AxiosResponse<UserModel[]>> (
        `${process.env.REACT_APP_API_BASE_URL}/users`
    ).then((res) => res.data)
}

export const getUserById = (id: string) => {
    return axios.get<any, AxiosResponse<UserModel>>(
        `${process.env.REACT_APP_API_BASE_URL}/users/${id}`
    ).then((res) => res.data)
}