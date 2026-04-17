const StatisticLine = ({ text, value }) => (
  <tr>
    <td style={{ width: '80px' }}>{text}</td>
    <td>{value}</td>
  </tr>
);
export default StatisticLine;
