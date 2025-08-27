function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task completed: ${time}ms`);
        }, time);
    });
}
async function runTask(): Promise<void> {
    try {
        const result = await simulateTask(2000);
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

runTask();