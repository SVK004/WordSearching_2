import { Link } from 'react-router-dom';
import './Completed.css';
import Confetti from 'react-confetti';

function Completed(){
  document.body.style = "overflow: hidden; background-color: #B1AFCF;font-family: Arial, sans-serif; display: flex;justify-content: center;align-items: center;height: 100vh;margin: 0;"
    return(
      <>
      <Confetti/>
        <div className="all-levels-completed">
      <h1>All Levels Completed!</h1>
      <h2>Congratulations !!!</h2>
      <Link to="/"> 
        <button>Replay</button> 
      </Link>
    </div>
    </>
    );
}

export default Completed;