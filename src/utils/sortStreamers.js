export const sortStreamers = (streamersArray) => {
  const toBeSorted = [...streamersArray];

  return toBeSorted.sort((a, b) => {
    if (a.upvotes > b.upvotes) {
      return -1;
    } else if (a.upvotes === b.upvotes) {
      if (a.downvotes < b.downvotes) {
        return -1;
      } else if (a.downvotes > b.downvotes) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    } else return 1;
  });
};
