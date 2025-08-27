function simulateTask(time: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task done in ${time} ms`);
    }, time);
  });
}

Promise.race([
  simulateTask(1000),
  simulateTask(2000),
  simulateTask(1500)
]).then((results) => {
  console.log("All tasks completed:");
  console.log(results);
});
