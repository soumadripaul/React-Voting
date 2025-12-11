import { useState } from 'react';

export default function VotingApp() {
  const [age, setAge] = useState('');
  const [isEligible, setIsEligible] = useState(null);
  const [votesA, setVotesA] = useState(0);
  const [votesB, setVotesB] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleAgeSubmit = () => {
    const ageNum = parseInt(age);
    if (ageNum >= 18) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  const handleVote = (candidate) => {
    if (candidate === 'A') {
      setVotesA(votesA + 1);
    } else {
      setVotesB(votesB + 1);
    }
    setHasVoted(true);
  };

  const getLeadingCandidate = () => {
    if (votesA > votesB) {
      return "Candidate A is leading";
    } else if (votesB > votesA) {
      return "Candidate B is leading";
    } else if (votesA === 0 && votesB === 0) {
      return "No votes yet";
    } else {
      return "It's a tie!";
    }
  };

  return (
    <>
      <div className="voting-container">
        <h1 className="main-title">🇧🇩 Bangladesh Student Council Election 2025</h1>
        {isEligible === null && (
          <div className="eligibility-check-section">
            <h2>Check Your Eligibility</h2>
            <p>Please enter your age to check if you can vote:</p>
            <div className="input-group">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className="age-input"
              />
              <button onClick={handleAgeSubmit} className="btn btn-primary">
                Check Eligibility
              </button>
            </div>
          </div>
        )}
        {isEligible === false && (
          <div className="message-box not-eligible">
            <h2>❌ Sorry, you are not eligible to vote.</h2>
            <p>You must be 18 years or older to participate in this election.</p>
          </div>
        )}
        {isEligible === true && !hasVoted && (
          <div className="voting-section">
            <div className="message-box eligible">
              <h2>✅ Welcome! You are eligible to vote.</h2>
              <p>Please cast your vote below:</p>
            </div>
            <div className="voting-buttons">
              <button onClick={() => handleVote('A')} className="btn btn-candidate-a">
                Vote for Candidate A
              </button>
              <button onClick={() => handleVote('B')} className="btn btn-candidate-b">
                Vote for Candidate B
              </button>
            </div>
          </div>
        )}
        {hasVoted && (
          <div className="message-box thank-you">
            <h2>🎉 Thank you for voting!</h2>
            <p>Your vote has been counted.</p>
          </div>
        )}
        <div className="results-section">
          <h2> Election Results</h2>
          <div className="vote-counts">
            <p><strong>Candidate A:</strong> <span className="vote-number">{votesA}</span> votes</p>
            <p><strong>Candidate B:</strong> <span className="vote-number">{votesB}</span> votes</p>
          </div>
          <div className="leading-status">
            {getLeadingCandidate()}
          </div>
        </div>
      </div>
    </>
  );
}