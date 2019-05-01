import React, { Component } from 'react';
import { object } from 'prop-types';
import {
  Form, Input, Select, Button,
} from 'antd';

import { pokemons } from '../../../feathers';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
      name: '',
      types: [],
      hp: '',
      attack: '',
      defense: '',
      spAttack: '',
      spDefense: '',
      speed: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id = 1 } = match.params;
    pokemons.get(id).then((pokemon) => {
      this.setState({
        pokemon,
        name: pokemon.name.english,
        types: pokemon.type,
        hp: pokemon.base.HP,
        attack: pokemon.base.Attack,
        defense: pokemon.base.Defense,
        speed: pokemon.base.Speed,
        spAttack: pokemon.base['Sp. Attack'],
        spDefense: pokemon.base['Sp. Defense'],
      });
    });
  }

  onSubmit = (e) => {
    const { history } = this.props;
    e.preventDefault();
    const {
      pokemon,
      name,
      types,
      hp,
      attack,
      defense,
      spAttack,
      spDefense,
      speed,
    } = this.state;
    pokemons.patch(pokemon.id, {
      name: {
        english: name,
        japanese: pokemon.name.japanese,
        chinese: pokemon.name.chinese,
      },
      type: types,
      base: {
        HP: hp,
        Attack: attack,
        Defense: defense,
        Speed: speed,
        'Sp. Attack': spAttack,
        'Sp. Defense': spDefense,
      },
    }).then(({ id }) => {
      history.push(`/view/${id}`);
    });
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onTypeSelect = (types) => {
    this.setState({ types });
  };


  render() {
    const {
      pokemon,
      name,
      types,
      hp,
      attack,
      defense,
      spAttack,
      spDefense,
      speed,
    } = this.state;

    if (!pokemon) {
      return <div />;
    }
    return (
      <div className='page-wrapper'>
        <h1>
          {'Update '}
          {pokemon.name.english}
        </h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Item label='Name'>
            <Input name='name' onChange={this.onChange} value={name} />
          </Form.Item>
          <Form.Item label='Types'>
            <Select
              mode='tags'
              style={{ width: '100%' }}
              placeholder='add types'
              onChange={this.onTypeSelect}
              value={types}
            />
          </Form.Item>
          <Form.Item label='HP'>
            <Input name='hp' onChange={this.onChange} value={hp} />
          </Form.Item>
          <Form.Item label='Attack'>
            <Input name='attack' onChange={this.onChange} value={attack} />
          </Form.Item>
          <Form.Item label='Defense'>
            <Input name='defense' onChange={this.onChange} value={defense} />
          </Form.Item>
          <Form.Item label='Sp Attack'>
            <Input name='spAttack' onChange={this.onChange} value={spAttack} />
          </Form.Item>
          <Form.Item label='Sp Defense'>
            <Input name='spDefense' onChange={this.onChange} value={spDefense} />
          </Form.Item>
          <Form.Item label='Speed'>
            <Input name='speed' onChange={this.onChange} value={speed} />
          </Form.Item>
          <Button type='primary' htmlType='submit'>Save</Button>
        </Form>
      </div>
    );
  }
}

Edit.propTypes = {
  match: object,
  history: object,
};

export default Edit;
