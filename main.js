const { once, EventEmitter } = require('events');

const myEmitter = new EventEmitter();
let isJobCurrentlyRunning = false;

async function doAsyncJobsOneByOne(id) {
    if (!isJobCurrentlyRunning) {
        doJob(id);
    } else {
        await once(myEmitter, 'jobdone');
        doJob(id);
    }
}

function doJob(id) {
    isJobCurrentlyRunning = true;
    setTimeout(() => {
        console.log('done', id)
        isJobCurrentlyRunning = false;
        myEmitter.emit('jobdone')
    }, randInt(1000))
}

for (let i = 0; i < 3; i++) {
    setTimeout((() => {
        doAsyncJobsOneByOne(i + 1)
    }).bind(i))
}
console.log('binded 3')
