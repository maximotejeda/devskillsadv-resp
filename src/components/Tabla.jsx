const Tabla = ({info}) => {
    const iterate = ()=>{
        if (!info)return
        let insideTable = info.map((item, idx) => {
            return(
                <tr className="table-row" key={item + idx}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>{item.ssn}</td>
                </tr>
            )
        })  
        return insideTable      
    }
    return(
        <table>
            <tbody>

        <tr className="header-table">
            <th className="cell-header">First Name</th>
            <th className="cell-header">Last Name</th>
            <th className="cell-header">Address</th>
            <th className="cell-header">SSN</th>
        </tr>
        {iterate()}
        
        </tbody>
    </table>
        )
}

export default Tabla