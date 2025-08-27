function simulateTaskAll(time: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task done in ${time} ms`);
    }, time);
  });
}

Promise.all([
  simulateTaskAll(1000),
  simulateTaskAll(2000),
  simulateTaskAll(1500)
]).then((results) => {
  console.log("All tasks completed:");
  console.log(results);
});
