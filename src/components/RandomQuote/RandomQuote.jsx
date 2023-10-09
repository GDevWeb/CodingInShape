import  { useState } from 'react'
import './RandomQuote.scss'
import reload from './refresh_icon.png'


const RandomQuote = () => {


    let quotes = [{
        text: "Tiens toi droit.",
        author: "Maman",
    },
    {
        "text": "Vas ranger ta chambre.",
        "author": "Maman"
    },
    {
        "text": "Mais qui m'a donné un enfant aussi bete",
        "author": "Papa"
    },
    {
        "text": "Reprend une part de gateau, tu es tout maigre",
        "author": "Mami"
    },
    {
        "text": "tiens prends ça, et ne dis rien à ta mami",
        "author": "Papi"
    },
    {
        "text": "De toute façon tu as triché",
        "author": "petit Frere"
    },
    {
        "text": "Tu auras le droit de jouer aprés moi",
        "author": "Grand frere"
    }];

// fonction asynchrone avec appel d'api (ne fonctionne pas car il fait encore mettre une autorisation à l'url.)

    // async function loadQuotes(){
    //     const response = await fetch("https://type.fit/api/quotes");
    //     quotes = await response.json();
    // }

    const [quote, setQuote] = useState({
        text: "Tips pour toi ",
        author: "Webmaster",
    });

    const random = () => {
        const select = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(select);
    }

    return (
        <div className="container">
            <h2>Citation du jour :</h2>
            <div className="quote"> {quote.text}</div>
            <div className='space'>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">{quote.author}</div>
                    <div className="icons">
                        {/* <img src={twitter} alt="" /> */}
                        <img src={reload} onClick={() => { random() }} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RandomQuote