const successOrFailure = (shouldFail: boolean): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject("Wrong");
      } else {
        resolve("Success!");
      }
    }, 1000);
  });
};

successOrFailure(false)
  .then((result) => console.log("Result:", result))
  .catch((err) => console.error("Error:", err))
  .finally(() => console.log("Done"));

successOrFailure(true)
  .then((result) => console.log("Result:", result))
  .catch((err) => console.error("Error:", err))
  .finally(() => console.log("Done"));
