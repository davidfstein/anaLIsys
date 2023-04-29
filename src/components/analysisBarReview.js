import '../styles/analysisBar.css';
import AnalysisBarMoves from './analysisBarMoves';
import AnalysisBarReviewSummary from './analysisBarReviewSummary';
import CentipawnPlot from './centipawnPlot';

const AnalysisBarReview = (props) => {

    const handleClick = (event) => {
        const buttons = Array.from(document.querySelector('.' + event.target.parentElement.className).getElementsByTagName("button"));
        buttons.forEach(td => td.classList.remove('selected'))
        event.target.classList.add('selected');
    }

    return  <div className='analysisBarBodyContainer'>
                <div className="analysisTabs">  
                    <button id='move-button' className='selected' onClick={handleClick}>Moves</button>
                    <button id='review-button' onClick={handleClick}>Review</button>
                    <button id='info-button' onClick={handleClick}>Info</button>
                </div>
                <div className="analysisOpening">{props.opening}</div>
                <div className='centiPlotContainer'><CentipawnPlot /></div>
                <AnalysisBarReviewSummary result="0-1" accuracyWhite="85.7" accuracyBlack="77"/>
                <AnalysisBarMoves />
            </div>
}

export default AnalysisBarReview;