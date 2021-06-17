import React from 'react';

export default class Card extends React.Component {

    /**
     * Get the symbol to display for this card
     */
    getSymbol(state) {
        if (state === 'hidden') {
            return '?';
        }
        return this.props.symbol;
    }

    /**
     * Render this component
     */
    render() {
        let { onClick, index, state } = this.props;
        return (
            <div className={`Card ${state}`}
                onClick={() => onClick(index)}>
                {this.getSymbol(state)}
            </ div>
        )
    }
}
