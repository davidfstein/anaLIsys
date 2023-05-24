import UserIconImage from './usericonimage';
import { useSelector } from 'react-redux';

const AnalysisBarReviewSummary = (props) => {

    const whiteImageUrl = useSelector((state) => state.game.whiteImage)
    const blackImageUrl = useSelector((state) => state.game.blackImage)

    return <div className='analysisBarReviewContainer'>
        <h2>
        <svg xmlns="http://www.w3.org/2000/svg" className="" width="32" height="32" viewBox="0 0 18 19">
            <g>
                <path opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
                <path fill="#96bc4b" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
                <path opacity="0.2" d="M9,3.43a.5.5,0,0,0-.27.08.46.46,0,0,0-.17.22L7.24,7.17l-3.68.19a.52.52,0,0,0-.26.1.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23l2.86,2.32-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,8.2A.44.44,0,0,0,14.86,8a.45.45,0,0,0,0-.28.53.53,0,0,0-.16-.23.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.73a.46.46,0,0,0-.17-.22A.5.5,0,0,0,9,3.43Z"></path>
                <path fill="#fff" d="M9,2.93A.5.5,0,0,0,8.73,3a.46.46,0,0,0-.17.22L7.24,6.67l-3.68.19A.52.52,0,0,0,3.3,7a.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23L6.15,10l-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,7.7a.44.44,0,0,0,.15-.23.45.45,0,0,0,0-.28A.53.53,0,0,0,14.7,7a.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.23A.46.46,0,0,0,9.27,3,.5.5,0,0,0,9,2.93Z"></path>
            </g>
        </svg> Game Review
        </h2>
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
        <div className='analysisBarMoveSummary'>
            <table>
                <tbody>
                    <tr className='brilliant'><td>0</td><td><img src="/images/brilliant.svg"/> Brilliant</td><td>0</td></tr>
                    <tr className='great'><td>0</td><td><img src="/images/great.svg"/> Great</td><td>0</td></tr>
                    <tr className='best'><td>0</td><td><img src="/images/best.svg"/> Best</td><td>0</td></tr>
                    <tr className='excellent'><td>0</td><td><img src="/images/excellent.svg"/> Excellent</td><td>0</td></tr>
                    <tr className='good'><td>0</td><td><img src="/images/good.svg"/> Good</td><td>0</td></tr>
                    <tr className='book'><td>0</td><td><img src="/images/book.svg"/> Book</td><td>0</td></tr>
                    <tr className='inaccuracy'><td>0</td><td><img src="/images/inaccuracy.svg"/> Inaccuracy</td><td>0</td></tr>
                    <tr className='mistake'><td>0</td><td><img src="/images/mistake.svg"/> Mistake</td><td>0</td></tr>
                    <tr className='blunder'><td>0</td><td><img src="/images/blunder.svg"/> Blunder</td><td>0</td></tr>
                </tbody>
            </table>
        </div>  
    </div>
}

export default AnalysisBarReviewSummary;