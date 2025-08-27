async function multiplyAfterDelay(num: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * 3);
    }, 1000); 
  });
}

async function complete() {
  const inputNumber = 5;
  console.log(`Đang xử lý số: ${inputNumber}...`);
  const result = await multiplyAfterDelay(inputNumber);
  console.log(`Kết quả là: ${result}`); 
}

complete();