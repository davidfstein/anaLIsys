import UserIconImage from './usericonimage';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const AnalysisBarReviewSummary = (props) => {

    const whiteImageUrl = useSelector((state) => state.game.whiteImage)
    const blackImageUrl = useSelector((state) => state.game.blackImage)

    return <div className='analysisBarReviewContainer'>
        <h2>Game Review</h2>
        <div className='analysisBarMoveSummary'>
            <table>
                <tbody>
                    <tr><td><FontAwesomeIcon icon={faCircleXmark} /> 0</td><td className='brilliant'>Brilliant</td><td>0</td></tr>
                    <tr><td><FontAwesomeIcon icon={faCircleXmark} /> 0</td><td className='great'>Great</td><td>0</td></tr>
                    <tr><td><FontAwesomeIcon icon={faCircleXmark} /> 0</td><td className='best'>Best</td><td>0</td></tr>
                    <tr><td><FontAwesomeIcon icon={faCircleXmark} /> 0</td><td className='excellent'>Excellent</td><td>0</td></tr>
                    <tr><td><FontAwesomeIcon icon={faCircleXmark} /> 0</td><td className='good'>Good</td><td>0</td></tr>
                    <tr><td><FontAwesomeIcon icon={faCircleXmark} /> 0</td><td className='book'>Book</td><td>0</td></tr>
                    <tr><td><FontAwesomeIcon icon={faCircleXmark} /> 0</td><td className='inaccuracy'>Inaccuracy</td><td>0</td></tr>
                    <tr><td><FontAwesomeIcon icon={faCircleXmark} /> 0</td><td className='mistake'>Mistake</td><td>0</td></tr>
                    <tr><td><FontAwesomeIcon icon={faCircleXmark} /> 0</td><td className='blunder'>Blunder</td><td>0</td></tr>
                </tbody>
            </table>
        </div>
        <div className='analysisBarResultContainer'>
            <div className='abaContainer d-flex align-items-center text-black bg-white border-success border'>
                <UserIconImage imageURL={whiteImageUrl} color="W" height="60px" width="60px"/>
                <div className='analysisBarAccuracy'><p>{props.accuracyWhite}</p><p>Accuracy</p></div>
            </div>
            <p>{props.result}</p>
            <div className='abaContainer d-flex align-items-center text-white bg-black border-danger border'>
                <UserIconImage imageURL={blackImageUrl} color="B" height="60px" width="60px"/>
                <div className='analysisBarAccuracy'><p>{props.accuracyBlack}</p><p>Accuracy</p></div>   
            </div>
        </div>  
    </div>
}

export default AnalysisBarReviewSummary;