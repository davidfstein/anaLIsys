import '../styles/centipawnPlot.css';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const CentipawnPlot = () => {

    const evals = useSelector((state) => state.game.evals)

    const DISPLAY_MAX = 8;
    const DISPLAY_MIN = -8;

    const parseCP = (evaluation, white) => {
      const cp_value = (evaluation.value / 100) * (!white ? 1 : -1);
      return {
        value: cp_value,
        display: cp_value
      }
    } 

    const parseMate = (evaluation, white) => {
      return {
        value: !white ? DISPLAY_MAX : DISPLAY_MIN,
        display: 'M' + evaluation.value
      }
    }

    const chartData = [];
    let parsedEval;
    let white;
    for (let i = 0; i < evals.length; i++) {
      white = i % 2 === 0;
      parsedEval = evals[i].type === 'cp' ? parseCP(evals[i], white) : parseMate(evals[i], white)
      chartData.push({x: i, 
                      value: parsedEval.value, 
                      display: parsedEval.display})
    }

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip" style={{backgroundColor: 'white'}}>
            {payload[0].payload.display}
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
    
    return <ResponsiveContainer width="100%"><AreaChart width={600}  data={chartData}>
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