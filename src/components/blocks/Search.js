import React from 'react';
import { object } from 'prop-types';
import { AutoComplete, Input } from 'antd';
import { withRouter } from 'react-router-dom';

import indexes from '../../search';

const maxSuggestions = 7;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    };
  }

  onSelect = (term) => {
    const { history } = this.props;
    history.push(`/search?q=${encodeURI(term)}`);
  };

  onAutoSearch = (term) => {
    if (term.length > 2) {
      const { pokemons } = indexes;
      const result = pokemons.search(term);
      const suggestions = [];
      for (let i = 0; i < result.length; i++) {
        result[i].matches.forEach((match) => {
          if (!suggestions.includes(match.value)) {
            suggestions.push(match.value);
          }
        });
        if (suggestions.length >= maxSuggestions) {
          break;
        }
      }
      this.setState({ suggestions });
    }
  };

  render() {
    const { suggestions } = this.state;
    return (
      <AutoComplete
        backfill
        dataSource={suggestions}
        onSelect={this.onSelect}
        onSearch={this.onAutoSearch}
        placeholder='Search Pokemons'
        optionLabelProp='text'
        size='large'
        dropdownAlign={{
          points: ['tl', 'bl'], // align dropdown bottom-left to top-left of input element
          offset: [1, -3], // align offset
          overflow: {
            adjustX: true,
            adjustY: true, // do not auto flip in y-axis
          },
        }}
      >
        <Input.Search
          size='large'
          placeholder='Search Pokemons'
        />
      </AutoComplete>
    );
  }
}

Search.propTypes = {
  history: object,
};

export default withRouter(Search);
