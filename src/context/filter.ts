/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { UserModel } from '../api/users';

export enum FilterEnum {
    COMPANY = 'company',
    CITY = 'city'
}

type FilterContextType = {
    filter: FilterEnum | undefined;
    setFilter: React.Dispatch<React.SetStateAction<FilterEnum | undefined>>;
}

const FilterContext = createContext<FilterContextType>({
    setFilter: () => {}, 
    filter: undefined
});

export default FilterContext;
