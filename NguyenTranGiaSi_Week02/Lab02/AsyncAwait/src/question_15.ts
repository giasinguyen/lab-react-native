async function fetchData(url: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000); 
  });
}

async function processData(): Promise<void> {
  try {
    const result1 = await fetchData("Data 1");
    console.log(`Received: ${result1}`);

    const result2 = await fetchData("Data 2");
    console.log(`Received: ${result2}`);

    const result3 = await fetchData("Data 3");
    console.log(`Received: ${result3}`);

  } catch (error) {
    console.error("Error:", error);
  }
}

processData();