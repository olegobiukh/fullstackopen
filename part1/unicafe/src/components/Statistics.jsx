import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) return <p>No feedback given</p>;

  const average = all > 0 ? (good - bad) / all : 0;
  const positivePercentage = all > 0 ? (good / all) * 100 : 0;

  return (
    <table>
      <tbody>
        <StatisticLine text="Good:" value={good} />
        <StatisticLine text="Neutral:" value={neutral} />
        <StatisticLine text="Bad:" value={bad} />
        <StatisticLine text="All:" value={all} />
        <StatisticLine
          text="Average:"
          value={Math.round(average * 100) / 100}
        />
        <StatisticLine
          text="Positive:"
          value={`${Math.round(positivePercentage * 100) / 100}%`}
        />
      </tbody>
    </table>
  );
};

export default Statistics;
