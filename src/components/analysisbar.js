import '../styles/analysisBar.css';
import AnalysisBarReview from './analysisBarReview';
import AnalysisBarFooter from './analysisBarFooter';
import GameLoader from './gameLoader';
import { Link, Route, Routes } from "react-router-dom";

const AnalysisBar = (props) => {

    const handleClick = (event) => {
        const links = Array.from(document.querySelector('.' + event.target.parentElement.parentElement.className).getElementsByTagName("a"));
        links.forEach(td => Array.from(td.classList).includes('selected') ? td.classList.remove('selected') : td.classList.add('selected'))
    }

    return <div className='col-3 analysisBar'>
                <div className="analysisHeader">
                    <Link to='/review'><button id='analysis-button' onClick={handleClick}>Analysis</button></Link>
                    <Link to='/' className='selected'><button id='gameload-button' onClick={handleClick}>Load Game</button></Link>
                </div>
                <Routes>
                    <Route path="review" element={<AnalysisBarReview opening={props.opening} />} />
                    <Route path="/" element={<GameLoader />} />
                </Routes>
                <AnalysisBarFooter />
           </div>
}

export default AnalysisBar;