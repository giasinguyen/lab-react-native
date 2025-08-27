async function basicAsyncAwait() {
    var value = await Promise.resolve('Hey there');
    console.log('inside: ' + value);
    return value;
}
basicAsyncAwait().then((res) => console.log('outside: ' + res));