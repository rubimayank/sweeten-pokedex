import React from 'react';
import {
  Layout, Menu,
} from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';
import List from './components/pages/List/index';
import View from './components/pages/View/index';
import Edit from './components/pages/Edit/index';
import Create from './components/pages/Create/index';
import SearchPage from './components/pages/Search/index';
import Search from './components/blocks/Search';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className='app-layout'>
        <Header className='app-header'>
          <Link to='/'><h1>Pokedex</h1></Link>
          <div className='search-wrapper'>
            <Search />
          </div>
          <Menu
            className='header-menu'
            theme='dark'
            mode='horizontal'
          >
            <Menu.Item>
              <Link to='/create'>Create</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className='app-content'>
          <Route path='/create' component={Create} />
          <Route path='/search' component={SearchPage} />
          <Route path='/view/:id?' component={View} />
          <Route path='/edit/:id?' component={Edit} />
          <Route path='/list/:page?' component={List} />
          <Route exact path='/' component={List} />
        </Content>
        <Footer className='app-footer'>
          Auther - Rubita Kumari
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
