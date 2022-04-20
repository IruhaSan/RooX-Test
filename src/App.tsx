import UserList from './pages/UserList';
import Layout from './utils/components/Layout';
import './assets/styles/index.scss';
import Container from './utils/components/Container';
import React, { Suspense } from 'react';
import { FC, lazy, useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ROUTES from './const/routes';

const UserListPage = lazy(() => import('./pages/UserList'));
const UserProfilePage = lazy(() => import('./pages/UserProfile'));

const App: FC = () => {

  return (
    <Container>
      <Layout>
        <Suspense fallback={(
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '50vh',
          }}
          >
            LOADING
          </div>
        )}>
          <Switch>
            <Route path={ROUTES.HOME} exact component={UserListPage} />
            <Route path={ROUTES.PROFILE} component={UserProfilePage} />
          </Switch>
      </Suspense>
      </Layout>
    </Container>
  );
}

export default App;
