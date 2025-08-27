const newPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000); 
});

newPromise.then((message) => {
  console.log(message); 
});