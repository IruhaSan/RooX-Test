import clsx from 'clsx'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById, UserData } from '../../api/users'
import classes from './UserProfile.module.scss'

type IProps = {
    
}

type ValidationUser = {
    name?: boolean;
    addressCity?: boolean;
    addressZipCode?: boolean;
    addressStreet?: boolean;
    email?: boolean;
    phone?: boolean;
    username?: boolean;
    website?: boolean;
}

type IParams = {
    id: string;
}

const UserProfile: FC<IProps> = (props) => {
    const { id } = useParams<IParams>();
    const [defaultUser, setDefaultUser] = useState<UserData>({
        name: '',
        addressCity: '',
        addressZipCode: '',
        addressStreet: '',
        email: '',
        phone: '',
        username: '',
        website: '',
    });
    const [user, setUserData] = useState<UserData>({
        name: '',
        addressCity: '',
        addressZipCode: '',
        addressStreet: '',
        email: '',
        phone: '',
        username: '',
        website: '',
        comment: '',
    });
    const [isReadOnly, setReadOnlyState] = useState(!!id);
    const [formValidationState, setFormValidationState] = useState<ValidationUser>();
    const validate = useCallback(() => {
        const errorObject: ValidationUser = {};
        if (!user.name) {
            errorObject.name = true;
        }
        if (!user.username) {
            errorObject.username = true;
        }
        if (!user.email) {
            errorObject.email = true;
        }
        if (!user.addressCity) {
            errorObject.addressCity = true;
        }
        if (!user.addressStreet) {
            errorObject.addressStreet = true;
        }
        if (!user.addressZipCode) {
            errorObject.addressZipCode = true;
        }
        if (!user.phone) {
            errorObject.phone = true;
        }
        if (!user.website) {
            errorObject.website = true;
        }
        return errorObject;
    }, [user])

    const onSubmit = useCallback(() => {
        if (Object.values(validate()).some(el => el)) return
        console.log(JSON.stringify(user));
    }, [user])

    useEffect(() => {
        getUserById(id).then((res) => {
            setUserData({
                name: res.name,
                username: res.username,
                email: res.email,
                addressCity: res.address.city || '',
                addressZipCode: res.address.zipcode || '',
                addressStreet: res.address.street || '',
                phone: res.phone,
                website: res.website,
                comment: ''
            });
            setDefaultUser({
                name: res.name,
                username: res.username,
                email: res.email,
                addressCity: res.address.city || '',
                addressZipCode: res.address.zipcode || '',
                addressStreet: res.address.street || '',
                phone: res.phone,
                website: res.website,
                comment: ''
            });
        });
    }, [id])

    useEffect(() => {
        setUserData(defaultUser);
    }, [isReadOnly])

    useEffect(() => {
        setFormValidationState(validate());
    }, [user])

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h1>Профиль пользователя</h1>
                <button onClick={() => setReadOnlyState(!isReadOnly)}>{isReadOnly ? 'Редактировать': 'Отменить изменения'}</button>
            </div>

            <div className={classes.card}>
                <div className={classes['card-main']}>
                    <p>Name</p>
                    <input 
                        value={user?.name} 
                        readOnly={isReadOnly} 
                        onChange={(e) => {
                                setUserData({ ...user, name: e.target.value});
                            }
                        } className={clsx(classes.formInput, formValidationState?.name && classes['formInput-failed'])}
                    />
                    <p>User name</p>
                    <input 
                        value={user?.username} 
                        readOnly={isReadOnly} 
                        onChange={(e) => setUserData({ ...user, username: e.target.value })}
                        className={clsx(classes.formInput, formValidationState?.username && classes['formInput-failed'])}
                    />
                    <p>E-mail</p>
                    <input 
                        value={user?.email} 
                        readOnly={isReadOnly} 
                        onChange={(e) => setUserData({ ...user, email: e.target.value })}
                        className={clsx(classes.formInput, formValidationState?.email && classes['formInput-failed'])}
                    />
                    <p>Street</p>
                    <input 
                        value={user?.addressStreet} 
                        readOnly={isReadOnly} 
                        onChange={(e) => setUserData({ ...user, addressStreet: e.target.value})}
                        className={clsx(classes.formInput, formValidationState?.addressStreet && classes['formInput-failed'])} 
                    />
                    <p>City</p>
                    <input 
                        value={user?.addressCity} 
                        readOnly={isReadOnly} 
                        onChange={(e) => setUserData({ ...user, addressCity: e.target.value })}
                        className={clsx(classes.formInput, formValidationState?.addressCity && classes['formInput-failed'])}
                    />
                    <p>Zip code</p>
                    <input 
                        value={user?.addressZipCode} 
                        readOnly={isReadOnly} 
                        onChange={(e) => setUserData({ ...user, addressZipCode: e.target.value})}
                        className={clsx(classes.formInput, formValidationState?.addressZipCode && classes['formInput-failed'])}
                    />
                    <p>Phone</p>
                    <input 
                        value={user?.phone} 
                        readOnly={isReadOnly} 
                        onChange={(e) => setUserData({ ...user, phone: e.target.value })}
                        className={clsx(classes.formInput, formValidationState?.phone && classes['formInput-failed'])}
                    />
                    <p>Website</p>
                    <input 
                        value={user?.website} 
                        readOnly={isReadOnly} 
                        onChange={(e) => setUserData({ ...user, website: e.target.value })}
                        className={clsx(classes.formInput, formValidationState?.website && classes['formInput-failed'])}
                    />
                    <p>Comment</p>
                    <textarea readOnly={isReadOnly} value={user.comment} onChange={(e) => setUserData({...user, comment: e.target.value }) } />
                </div>
            </div>
            <div className={classes.submit}>
                <button disabled={isReadOnly} onClick={onSubmit}>Отправить</button>
            </div>
        </div>
    )
}

export default UserProfile