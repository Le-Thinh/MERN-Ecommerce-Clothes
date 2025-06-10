export const handlePrev = (current, max, setFunc) => () => {
  if (current > 0) {
    setFunc(current - 1);
  }
};

export const handleNext = (current, max, setFunc) => () => {
  if (current < max) {
    setFunc(current + 1);
  }
};
