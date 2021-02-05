import "milligram";
function AttemptLogs(props) {
  return (
    <div className="box flex wide center">
      <table>
        <thead>
          <tr>
            {/* table padding */}
            <th> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th>Guess</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {props.logs.map((log, idx) => (
            <tr key={idx}>
              <td>{idx + 1}. </td>
              <td>{log[0]}</td>
              <td>{log[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttemptLogs;
