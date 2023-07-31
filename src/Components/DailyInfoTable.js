export default ({dailyData}) => {
    if(!dailyData) return null;
    const { time, temperature_2m_max : tempMax, temperature_2m_min: tempMin } = dailyData;
    const tableRows = [];
    for(let i = 0; i < time.length; i++){
        tableRows.push(
            <tr key={`uniq-${time[i]}`}>
                <td>{time[i]}</td>
                <td>{tempMax[i]}</td>
                <td>{tempMin[i]}</td>
            </tr>
        )
    }
    return (<table className="table">
        <thead>
            <tr>
                <th>Time</th>
                <th>Max Temperature</th>
                <th>Min Temperature</th>
            </tr>
        </thead>
        <tbody>
            {tableRows}
        </tbody>
    </table>)
}