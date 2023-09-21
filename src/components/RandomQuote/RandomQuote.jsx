import React, { useState } from 'react'
import './RandomQuote.scss'
import twitter from './twitter.png'
import reload from './refresh_icon.png'


const RandomQuote = () => {
    
    const api="https://type.fit/api/quotes";
    let quotes = [];

    async function loadQuotes(){
        const response = await fetch(api);
        quotes = await response.json();
    }
    
    const [quote, setQuote] = useState({
        text: "Tient toi droit.",
        author: "Maman",
    });

    const random = () => {
        const select = quotes[Math.floor(Math.random()*quotes.length)];
        setQuote(select);
    }
    
    return (
    <div className='container'>
        <div className="quote"> {quote.text}</div>
        <div>
            <div className="line"></div>
            <div className="bottom">
                <div className="author">{quote.author}</div>
                <div className="icons">
                    <img src={twitter} alt="" />
                    <img src={reload} onClick={()=>{random()}} alt="" />
                </div>
            </div>
        </div>
    </div>
  );
}

export default RandomQuote