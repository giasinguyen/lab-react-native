const filterEvenNumbers = (arr: number[]): Promise<number[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const evens = arr.filter((num) => num % 2 === 0);
      resolve(evens);
    }, 1000);
  });
};

filterEvenNumbers([1, 2, 3, 4, 5, 6])
  .then((evens) => {
    console.log("Even numbers:", evens); 
  });
