import UserIconImage from './usericonimage';
import { useSelector } from 'react-redux';

const AnalysisBarReviewSummary = (props) => {

    const whiteImageUrl = useSelector((state) => state.game.whiteImage)
    const blackImageUrl = useSelector((state) => state.game.blackImage)

    return <div className='analysisBarReviewContainer'>
        <h2>Game Review</h2>
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