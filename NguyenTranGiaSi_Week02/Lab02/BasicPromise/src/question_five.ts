function simulateTaskOne(time: any) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task Done");
        }, time);
    });
}

simulateTaskOne(2000).then((message) => {
    console.log(message);
});
