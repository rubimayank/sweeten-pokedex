import React, { Component } from 'react';
import { object } from 'prop-types';
import {
  Card, Col, Row, Pagination,
} from 'antd';
import { Link } from 'react-router-dom';

import { pokemons } from '../../../feathers';
import './style.css';

const $limit = 12;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dex: {
        data: [],
        total: 0,
      },
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { page = 1 } = match.params;
    this.changePage(page);
  }

  changePage = (page) => {
    const { history } = this.props;
    pokemons.find({
      query: {
        $limit,
        $skip: (page - 1) * $limit,
      },
    }).then((dex) => {
      this.setState({ dex });
      history.push(`/list/${page}`);
    });
  };

  render() {
    const { dex } = this.state;
    const { match } = this.props;
    const { page = 1 } = match.params;
    return (
      <div>
        <Row gutter={16}>
          {dex.data.map(pokemon => (
            <Col xs={24} sm={12} md={8} lg={6} key={pokemon.id} style={{ padding: '10px' }}>
              <Link to={`/view/${pokemon.id}`}>
                <Card
                  hoverable
                  cover={(
                    <div className='card-image-wrapper'>
                      <div>
                        <img
                          className='responsive-image'
                          alt={pokemon.name.english}
                          src={`https://img.pokemondb.net/artwork/large/${pokemon.name.english.toLowerCase()}.jpg`}
                        />
                      </div>
                    </div>
                  )}
                >
                  <Card.Meta
                    title={<b>{pokemon.name.english}</b>}
                    description=''
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <Pagination
          current={page * 1}
          total={dex.total}
          pageSize={$limit}
          onChange={this.changePage}
        />
      </div>
    );
  }
}

List.propTypes = {
  match: object,
  history: object,
};

export default List;
