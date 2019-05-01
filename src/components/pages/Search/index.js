import React, { Component } from 'react';
import { object } from 'prop-types';
import {
  Card, Col, Row,
} from 'antd';
import { Link } from 'react-router-dom';
import qs from 'qs';

import indexes from '../../../search';

const $limit = 12;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dex: [],
      term: '',
    };
  }

  componentWillMount() {
    this.updateTerm();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (prevProps.location !== location) {
      this.updateTerm();
    }
  }

  updateTerm = () => {
    const { location } = this.props;
    const { q } = qs.parse(location.search.replace('?', ''));
    this.setState({ term: q });
    const wait = setInterval(() => {
      if (indexes.pokemons) {
        clearInterval(wait);
        this.setState({
          dex: indexes.pokemons.search(q).slice(0, $limit).map(i => i.item),
        });
      }
    }, 100);
  };

  render() {
    const { dex, term = '' } = this.state;
    return (
      <div>
        <h1>{`Search ${term}`}</h1>
        <Row gutter={16}>
          {dex.map(pokemon => (
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
      </div>
    );
  }
}

Search.propTypes = {
  location: object,
};

export default Search;
