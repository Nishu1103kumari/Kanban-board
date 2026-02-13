export const mockApiCall = () => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 1000 + 1000; 

    setTimeout(() => {
      const shouldFail = Math.random() < 0.2; 

      if (shouldFail) {
        reject("Server error");
      } else {
        resolve("Success");
      }
    }, delay);
  });
};