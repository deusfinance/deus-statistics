import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import Staking from 'pages/Staking/Staking';
import Vaults from 'pages/Vaults/Vaults';
import Token from 'pages/Token/Token';
import MARKETS from 'pages/Markets/Markets';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Redirect exact path={'/'} to={'/staking'} />
        <Route path={'/staking'} component={Staking} />
        <Route path={'/vaults'} component={Vaults} />
        <Route path={'/token'} component={Token} />
        <Route path={'/markets'} component={MARKETS} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}