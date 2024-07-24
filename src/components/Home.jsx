import { Link } from 'react-router-dom';
import './Home.css';

function Home(prop) {

  let lang = prop.lang;
  let setLang = prop.setLang
  const handleLangChange = (event) => {
    setLang(event.target.value);
  };

  return (
    <>
      <div className="App1">
        <div className="header-container">
          <h1 className='head1'>Word Search</h1>
          <img src="../src/assets/images/word_search icon.png" alt="Search Icon" className='image' />
        </div>
        <h3>Welcome to the Puzzle Game</h3>
        <span>
          <Link to="/game1">
            <button className="Start-button">Start</button>
          </Link>
          <Link to="https://joywithlearning.com/games">
            <button className="Home-button">Home</button>
          </Link>
        </span>
        <br/>
        <div>
          <input 
            type='radio' 
            id='English' 
            name='Language' 
            value='English' 
            checked={lang === 'English'} 
            onChange={handleLangChange} 
          />
          <label htmlFor='English'>English</label>
          <input 
            type='radio' 
            id='Hindi' 
            name='Language' 
            value='Hindi' 
            checked={lang === 'Hindi'} 
            onChange={handleLangChange} 
          />
          <label htmlFor='Hindi'>Hindi</label>
          <input 
            type='radio' 
            id='Telugu' 
            name='Language' 
            value='Telugu' 
            checked={lang === 'Telugu'} 
            onChange={handleLangChange} 
          />
          <label htmlFor='Telugu'>Telugu</label>
        </div>
      </div>
    </>
  );
}

export default Home;
