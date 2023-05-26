import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useSelector } from 'react-redux';
import '../styles/evalBar.css';

const EvaluationBar = () => {

    const evals = useSelector((state) => state.game.evals);
    const currentMove = useSelector((state) => state.game.currentMove);

    const DISPLAY_MIN = 0;
    const DISPLAY_MAX = 16;
    const DEFAULT = [{x: 0, value: 8}];
    const evaluation = evals && currentMove ? evals[currentMove] : null;

    const parseCP = (evaluation, white) => {
        const cp_value = (evaluation.value / 100) * (!white ? 1 : -1);
        return {
            value: cp_value + 8,
            display: cp_value
        }
    } 

    const parseMate = (evaluation, white) => {
        return {
            value: !white ? DISPLAY_MAX : DISPLAY_MIN,
            display: 'M' + evaluation.value
        }
    }

    let white;
    let parsedEval = {value: DEFAULT.value, display: 0};
    let chartData = DEFAULT;
    if (evaluation) {
        white = currentMove % 2 === 0;
        parsedEval = evaluation.type === 'cp' ? parseCP(evaluation, white) : parseMate(evaluation, white);
        chartData = [{x: 0, value: parsedEval.value}];
    }

    const renderLabel = (entry) => {
        return <text 
               x={entry.x} 
               y={730} 
               dx='15'
               dy={0}
               fontSize='11' 
               fontFamily='sans-serif'
               fill={entry.fill}
               textAnchor="middle"
               >
                {parsedEval.display}
        </text>
    }

    return <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}
                    width={30}
                    barCategoryGap={0}
                    barGap={0}
                    margin={{
                        top: 0,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis hide={true} />
                    <YAxis domain={[0, 16]} padding={{ bottom: 0, top: 0 }} tickLine={false}/>
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="value" fill="#ffffff" background={{ fill: '#403d39' }} label={{content: renderLabel, position: 'insideBottomLeft', 
                                                                                                 fill: 'black', }}/>
                </BarChart>
            </ResponsiveContainer>
}

export default EvaluationBar;