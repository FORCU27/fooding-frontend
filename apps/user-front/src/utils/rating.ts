/**
 * 별점 비율을 나타내는 바
 * @param score
 * @returns score, count, ratio
 */
export interface RatingRatio {
  score: number;
  count: number;
  ratio: number;
}

export const getRatingRatios = (ratingCounts: { [score: number]: number }): RatingRatio[] => {
  const total = Object.values(ratingCounts).reduce((sum, val) => sum + val, 0);
  const scores = [5, 4, 3, 2, 1];

  return scores.map((score) => {
    const count = ratingCounts[score] || 0;
    const ratio = total > 0 ? (count / total) * 100 : 0;

    return { score, count, ratio };
  });
};
