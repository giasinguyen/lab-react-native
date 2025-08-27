function getRandomNumberPromise() {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.random(); 

    if (randomNumber > 0.5) {
      resolve(randomNumber);
    } else {
      reject(new Error("Random number less than 0.5")); 
    }
  });
}

getRandomNumberPromise()
    .then((number) => {
      console.log("Resolved with number:", number); 
    })
    .catch((error) => {
        console.log("Error!", error.message)
    })

