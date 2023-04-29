import '../styles/centipawnPlot.css';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

const CentipawnPlot = () => {

    const chartData = SAMPLE_CENTIPAWNS.map((sc, i) => { return {x: i, value: sc} });

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip" style={{backgroundColor: 'white'}}>
            {payload[0].value}
          </div>
        );
      }
    
      return null;
    };
    
    const gradientOffset = (data) => {
        const dataMax = Math.max(...data.map((i) => i.value));
        const dataMin = Math.min(...data.map((i) => i.value));
      
        if (dataMax <= 0) {
          return 0;
        }
        if (dataMin >= 0) {
          return 1;
        }
      
        return dataMax / (dataMax - dataMin);
      };
      
    const off = gradientOffset(chartData);
    
    return <ResponsiveContainer width="100%" height="100%"><AreaChart width={600} height={200} data={chartData}>
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="white" />
                        <stop offset={off} stopColor="black" />
                    </linearGradient>
                </defs>
                <XAxis dataKey='x' hide={true}/>
                <YAxis dataKey='value' domain={[-8, 8]} allowDataOverflow={true} hide={true}/>
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#32302d" fillOpacity={1} fill="url(#splitColor)" />
            </AreaChart></ResponsiveContainer>
}

export default CentipawnPlot;