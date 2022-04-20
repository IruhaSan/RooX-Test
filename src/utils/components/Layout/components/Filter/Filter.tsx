import clsx from 'clsx';
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UserData } from '../../../../../api/users';
import FilterContext, { FilterEnum } from '../../../../../context/filter';
import classes from './Filter.module.scss';

type IProps = {
}

const Filter: FC = () => {
    const { filter, setFilter } = useContext(FilterContext);
    return (
        <div className={classes.root}>
            <div className={classes.filter}>
                <p>Сортировка</p>
                <button 
                onClick={() => {
                    if (filter === FilterEnum.CITY) {
                        setFilter(undefined)
                    } else {
                        setFilter(FilterEnum.CITY)
                    }
                }} 
                className={clsx(classes.filterButton, (filter === FilterEnum.CITY) && classes['filterButton-actived'])}>По городу</button>
                <button 
                    onClick={() => {
                        if (filter === FilterEnum.COMPANY) {
                            setFilter(undefined)
                        } else {
                            setFilter(FilterEnum.COMPANY)
                        }
                    }} 
                className={clsx(classes.filterButton,(filter === FilterEnum.COMPANY) && classes['filterButton-actived'])}>По компании</button>
            </div>
        </div>
    )
}

export default Filter;