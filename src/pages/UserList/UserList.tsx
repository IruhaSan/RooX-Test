import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers, UserData, UserModel } from '../../api/users';
import FilterContext, { FilterEnum } from '../../context/filter';
import classes from './UserList.module.scss';

const UserList: FC = () => {
  const history = useHistory();
  const memoGoTo = useCallback(goTo, [history]);
  const [userList, setUserList] = useState<UserModel[]>([]);
  const { filter } = useContext(FilterContext); 
  useEffect(() => {
    getUsers().then(setUserList);
  }, []);
  const memoUserList = useMemo<UserModel[]>(() => {
    if (!filter) return userList;
    const userListCopy: UserModel[] = JSON.parse(JSON.stringify(userList));
    if (filter === FilterEnum.CITY) {
       userListCopy.sort((a, b) => a.address.city > b.address.city ? 1 : -1)
    }
    if (filter === FilterEnum.COMPANY) {
      userListCopy.sort((a, b) => a.company.name > b.company.name ? 1 : -1)
    }
    return userListCopy;
  }, [filter, userList])
  return (
    <div className={classes.root}>
      <div className={classes.list}>
        <h1>Список пользователей</h1>
        {
          memoUserList.map((user, index) => (
            <div className={classes['list-userCard']} key={`user-${index}`}>
              <div>
                <p><strong>ФИО:</strong> {user.name} </p>
                <p><strong>Город:</strong> {user.address.city}</p>
                <p><strong>Компания:</strong> {user.company.name}</p>
              </div>
              <button onClick={memoGoTo(`/users/${user.id?.toString()}`)}>Подробнее</button>
            </div>
          ))
        }
      </div>
      <div className={classes['users-quantity']}>
        <p>Найдено {memoUserList.length} пользователей</p>
      </div>
    </div>
  )
  function goTo(path: string): { (): void } {
    return () => {
      history.push(path);
    }
  }
} 

export default UserList;