function rejectPromiseAfterOneSecond() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000); 
  });
}
rejectPromiseAfterOneSecond()
  .then((message) => {
    console.log(message); 
  })
  .catch((error) => {
    console.error("Error:", error.message); 
  });