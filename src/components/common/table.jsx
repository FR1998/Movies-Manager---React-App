import React from 'react'
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = (props) => {

    const {columns, sortColumn, data, onSort } = props;
    return (  <table className="table">
    <TableHeader
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
    <TableBody columns={columns} data={data}/>
    {<tbody>
      {data.map((movie) => (
        <tr key={movie._id}>
        </tr>
      ))}
    </tbody>}
  </table>  );
}
 
export default Table;