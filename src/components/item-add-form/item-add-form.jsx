import React, { Component } from 'react';

export default class ItemAddForm extends Component {

  state = {};

  render () {
    const {onAddItem} = this.props;

    return (
      <div className="item-add-form">
        <button className="btn btn-outline-secondary "
                onClick={() => onAddItem('Helo ')}>Add Item</button>
      </div>
    );  
  }

}