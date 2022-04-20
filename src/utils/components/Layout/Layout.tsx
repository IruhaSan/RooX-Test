import clsx from 'clsx';
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { getUsers, UserModel } from '../../../api/users';
import Container from '../Container';
import FilterContext, { FilterEnum } from '../../../context/filter';
import Filter from './components/Filter';
import classes from './Layout.module.scss';

type IProps = {
    children?: React.ReactNode
  }

const Layout: FC<IProps> = ({ children }) => {
  const [filter, setFilter] = useState<FilterEnum>()

  return (
   <div className={classes.root}>
     <FilterContext.Provider value={{
       filter,
       setFilter
     }}>
        <Filter />
        { children }
     </FilterContext.Provider>
   </div>
  );
};

export default Layout;
