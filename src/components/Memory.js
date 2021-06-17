import React from 'react';
import Card from './Card';
import { shuffle } from 'lodash';

const symbols = [
    '🚀',
    '🚁',
    '🚂',
    '🚒',
    '🚠',
    '🚕',
]

export default class Memory extends React.Component {

    /**
     * Constructor
     */
    constructor(props) {
        super(props)
        this.state = {
            cards: this.shuffleCards(),
            matchedCardIndices: new Set(),
            currentPair: [],
        }
    }

    /**
     * Get an array of shuffled cards
     */
    shuffleCards() {
        return shuffle([...symbols, ...symbols]);
    }

    handleCardClick = (index) => {

        console.log('card', index, 'clicked');

        let { cards, currentPair, matchedCardIndices } = this.state;

        // Current card already picked or matched
        if (matchedCardIndices.has(index)) {
            console.log('This card was already matched');
            return;
        }

        switch (currentPair.length) {

            case 0:
                if (!matchedCardIndices.has(index))
                    currentPair.push(index);
                break;

            case 1:

                let firstCardIndex = currentPair[0];
                let currentCardIndex = index;
                let firstCardSymbol = cards[firstCardIndex];
                let currentCardSymbol = cards[index];

                // Picked an other card than the previous picked one
                if (currentCardIndex !== firstCardIndex) {

                    // Pair found
                    if (firstCardSymbol === currentCardSymbol) {

                        // Add the 2 current cards to the match list
                        matchedCardIndices.add(index);
                        matchedCardIndices.add(currentPair[0]);

                        currentPair = [];

                        console.log(matchedCardIndices.size, this.state.cards.length);
                        if (matchedCardIndices.size === this.state.cards.length) {
                            setTimeout(() => {
                                alert('win !');
                            }, 500);
                        }
                    }
                    // Cards don't match
                    else {
                        currentPair[1] = currentCardIndex;
                        setTimeout(() => {
                            this.setState({
                                currentPair: []
                            })
                        }, 1000);
                    }
                }
                else {
                    console.log('This card was already picked');
                }
                break;

            default:
        }

        this.setState({
            currentPair,
            matchedCardIndices,
        })
    }

    /**
     * Get the state of a card by its index
     */
    getCardState(index) {
        if (this.state.currentPair.indexOf(index) !== -1)
            return 'picked';
        if (this.state.matchedCardIndices.has(index))
            return 'matched';
        return 'hidden';
    }

    /**
     * Start a new game
     */
    newGame = () => {
        this.setState({
            cards: this.shuffleCards(),
            matchedCardIndices: new Set(),
            currentPair: [],
        })
    }

    /**
     * Display the card list
     */
    renderCards() {
        return this.state.cards.map((symbol, index) => {
            return <Card symbol={symbol}
                onClick={this.handleCardClick}
                key={index}
                index={index}
                state={this.getCardState(index)}
            />
        })
    }

    /**
     * Render this component
     */
    render() {
        return (
            <div className='Memory'>
                <button className='btn' onClick={this.newGame}>Nouvelle partie</button>
                <div className='Memory-list'>
                    {this.renderCards()}
                </div>
            </div>
        )
    }
}
