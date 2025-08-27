Promise.resolve(2)
  .then((num) => {
    return num * num;
  })
  .then((squared) => {
    return squared * 2;
  })
  .then((doubled) => {
    return doubled + 5;
  })
  .then((finalResult) => {
    console.log("Final result:", finalResult);
  })
  .catch((error) => {
    console.error("Something went wrong:", error);
  });
