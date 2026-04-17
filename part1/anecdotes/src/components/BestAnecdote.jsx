const BestAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);

  if (maxVotes === 0) return <p>No votes cast yet.</p>;

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <div>
        <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
        <p>has {maxVotes} votes</p>
      </div>
    </div>
  );
};

export default BestAnecdote;
