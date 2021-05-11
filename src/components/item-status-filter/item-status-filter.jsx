import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    btns = [
        {name: 'all', label: 'all'},
        {name: 'active', label: 'active'},
        {name: 'done', label: 'done'}
    ]

    render () {

        const {filter, onFilterChange} = this.props;

        const btns = this.btns.map(({name, label}) => {

            const isActive = filter === name;
            const classBtn = isActive ? 'btn-info' : 'btn-outline-secondary';
            return <button type="button"
                            key={name}
                            className={`btn ${classBtn}`}
                            onClick={() => onFilterChange(name)}>
                        {label}
                    </button>
    
        })

        return (
            <div className="btn-group item-status-filter">
                {btns}
            </div>
        )
    }
}