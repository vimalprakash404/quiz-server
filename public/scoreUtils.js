// scoreUtils.js
const Score = require('../model/scoreModel');

async function calculateRanks(quizId, userId) {
  try {
    // Fetch all scores for the given quiz, ordered by score in descending order
    const scores = await Score.find({ quizId }).sort({ score: -1, submissionDateTime: 1 });

    // Assign ranks based on the order of scores
    scores.forEach((score, index) => {
      score.rank = index + 1;
    });

    // Save the updated scores with ranks to the database
    await Promise.all(scores.map((s) => s.save()));

    // Find the rank of the specified user
    const userScore = scores.find((s) => s.userId.toString() === userId.toString());
    const userRank = userScore ? userScore.rank : null;

    console.log('Ranks calculated and updated successfully.');
    return userRank;
  } catch (error) {
    console.error('Error calculating ranks:', error);
    return null;
  }
}

module.exports = { calculateRanks };
