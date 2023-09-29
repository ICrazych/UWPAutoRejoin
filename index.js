const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

let lastRequest = 0
let lastRestartRequest = 0

function sleep(ms){return new Promise((resolve) => {setTimeout(resolve, ms)})}
function getTimestamp(){return Date.now()/1000}

async function checkRoblox() {
    if ((getTimestamp() - lastRequest) >= 60 && (getTimestamp() - lastRestartRequest) > 40) {
        console.log("Roblox is not found. Restarting...")
        exec('start /B "" "restart.cmd"', (error) => {
            if (error) {
                console.error(`Error executing restart.cmd: ${error}`);
                return;
            }
            lastRestartRequest = getTimestamp()
            console.log('Roblox restarted successfully');
        });
        await sleep(1000)
    }
}

app.use(express.json());

app.post('/api/ping', (req, res) => {
    //console.log("Roblox is currently running. [ping request recieved]")
    lastRequest = getTimestamp()
    res.json({status: true, message: "Ping request recieved"}).status(200);
});

app.listen(port, async () => {
    process.stdout.write(
        String.fromCharCode(27) + "]0;" + "Roblox Restarter???" + String.fromCharCode(7)
    );
    console.clear()
    console.log(`Server is running`);

    //checkRoblox()

    setInterval(checkRoblox, 12500);
});

