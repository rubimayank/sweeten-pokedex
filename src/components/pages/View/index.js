import React, { Component } from 'react';
import { object } from 'prop-types';
import {
  Col, Row, Tag, Button,
} from 'antd';
import { Link } from 'react-router-dom';

import { pokemons } from '../../../feathers';
import './style.css';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id = 1 } = match.params;
    pokemons.get(id).then((pokemon) => {
      this.setState({ pokemon });
    });
  }

  render() {
    const { pokemon } = this.state;
    if (!pokemon) {
      return <div />;
    }
    return (
      <div className='page-wrapper'>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <img
              className='responsive-image'
              alt={pokemon.name.english}
              src={`https://img.pokemondb.net/artwork/large/${pokemon.name.english.toLowerCase()}.jpg`}
            />
          </Col>
          <Col xs={24} sm={12} md={16}>
            <div className='view-wrapper'>
              <h1>{pokemon.name.english}</h1>
              <p>
                <b>{pokemon.name.japanese}</b>
                <br />
                <b>{pokemon.name.chinese}</b>
              </p>
              {pokemon.type.map(t => <Tag key={t} color='geekblue'>{t}</Tag>)}
              <br />
              <br />
              <h2>Base Attributes</h2>
              <table className='data-table'>
                <tbody>
                  {Object.entries(pokemon.base).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br />
              <Link to={`/edit/${pokemon.id}`}>
                <Button type='primary'>Edit</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

View.propTypes = {
  match: object,
};

export default View;
