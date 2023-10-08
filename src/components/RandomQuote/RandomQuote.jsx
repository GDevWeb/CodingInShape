import { useState, useEffect } from 'react';
import quotes from './Quotes.jsx';
import Icons from '../../assets/icons/index_icons.jsx';
import "./RandomQuote.scss";

export default function RandomQuote() {
    const [selectedQuote, setSelectedQuote] = useState({ text: '', author: '' });

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        setSelectedQuote(randomQuote);
    };

    useEffect(() => {
        getRandomQuote();
    }, []);

    return (
        <div className="container">
            <h2>Citations du jour :</h2>
            <div className="quote">{selectedQuote.text}</div>
            <div className="space">
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">{selectedQuote.author}</div>
                    <div className="icons">
                        <img
                            src={Icons.Refresh}
                            onClick={getRandomQuote}
                            alt="icon refresh"
                            width={"100px"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
