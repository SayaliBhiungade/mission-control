import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga';
import { connect } from 'react-redux'
import { Collapse, Icon } from 'antd';
import Oauth from '../../components/user-management/Oauth'
import Email from '../../components/user-management/Email'
import Sidenav from '../../components/sidenav/Sidenav'
import Topbar from '../../components/topbar/Topbar'
import Documentation from '../../components/documentation/Documentation'
import Header from '../../components/header/Header'
import mailIcon from '../../assets/mailIcon.svg'
import googleIcon from '../../assets/googleIcon.svg'
import fbIcon from '../../assets/fbIcon.svg'
import twitterIcon from '../../assets/twitterIcon.svg'
import githubIcon from '../../assets/githubIcon.svg'
import CollapseHeader from './CollapseHeader'
import './user-management.css'
import { get, set } from 'automate-redux';
import store from "../../store";

const Panel = Collapse.Panel;
function UserManagement(props) {
  useEffect(() => {
    ReactGA.pageview("/projects/user-management");
  }, [])
  return (
    <div className="user-management">
      <Topbar showProjectSelector />
      <div className="flex-box">
        <Sidenav selectedItem="user-management" />
        <div className="page-content">
          <div className="header-flex">
            <Header name="Authentication" color="#000" fontSize="22px" />
            <Documentation url="https://docs.spaceuptech.com/auth" />
          </div>
          <div className="collapse">
            <Collapse accordion expandIconPosition="right" expandIcon={({ isActive }) => <Icon type="right" rotate={isActive ? 270 : 90} />}>
              <Panel header={(<CollapseHeader icon={mailIcon} desc="Mail" />)} key="1">
                <Email formState={props.email} handleChange={(values) => props.handleChange("email", values)} />
              </Panel>
            </Collapse><br />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    email: get(state, "config.modules.auth.email", {}),
    google: get(state, "config.modules.auth.google", {}),
    fb: get(state, "config.modules.auth.fb", {}),
    twitter: get(state, "config.modules.auth.twitter", {}),
    github: get(state, "config.modules.auth.github", {}),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (provider, values) => {
      const providerConfig = get(store.getState(), `config.modules.auth.${provider}`, {})
      dispatch(set(`config.modules.auth.${provider}`, Object.assign({}, providerConfig, values)))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);

