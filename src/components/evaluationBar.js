import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import '../styles/evalBar.css';

const SAMPLE_CENTIPAWNS = [
    0.3,
    0.34,
    0.36,
    0.68,
    0.28,
    1.02,
    0.37,
    0.4,
    -0.72,
    -0.66,
    -0.68,
    -0.78,
    -0.8,
    -0.81,
    -0.86,
    -0.68,
    -1.48,
    -0.75,
    -0.74,
    -0.34,
    -0.27,
    -0.29,
    -1.76,
    -1.93,
    -2.38,
    -1.32,
    -1.36,
    -1.34,
    -1.47,
    -0.82,
    -0.77,
    0.3,
    0.1,
    0.04,
    -0.18,
    3.66,
    3.59,
    3.8,
    3.81,
    3.96,
    3.3,
    3.37,
    3.28,
    3.99,
    3.93,
    4.14,
    3.32,
    3.58,
    1.18,
    1.66,
    1.03,
    2.49,
    1.5,
    2.5,
    2.55,
    2.7,
    2.71,
    2.71,
    2.81,
    3.31,
    -0.13,
    -0.15,
    -0.12,
    0.0,
    -0.03,
    -0.07,
    -0.1,
    0.0,
    -1.96,
    2.88,
    -9.94,
    -11.75
]

const EvaluationBar = ({ evaluation }) => {

    const chartData = [{x: 0, value: evaluation + 8}];

    const renderLabel = (entry) => {
        return <text 
               x={entry.x} 
               y={730} 
               dx='23'
               dy={0}
               fontSize='11' 
               fontFamily='sans-serif'
               fill={entry.fill}
               textAnchor="middle"
               >
                {evaluation}
        </text>
    }

    return <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}
                    width={35}
                    barCategoryGap={0}
                    barGap={0}
                    margin={{
                        top: 0,
                        right: 35,
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