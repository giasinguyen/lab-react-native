async function fetchData(url: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000); 
  });
}

Promise.all([
  fetchData("Data 1"),
  fetchData("Data 2"),
  fetchData("Data 3")
]).then((results) => {
  console.log("All tasks completed:");
  console.log(results);
});
