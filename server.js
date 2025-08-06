const express = require('express');
const si = require('systeminformation');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/stats', async (req, res) => {
  try {
    const [cpu, mem, disk,uptime] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.time()
    ]);

    exec('vcgencmd measure_temp', (err,stdout) => {
      if(err){
        console.error('Error reading temp:',err);
        return res.status(500).json({error: 'Failed to get temp'});
      }
      const temp = stdout ? stdout.split('=')[1].trim() : 'N/A';
      
      exec("iwconfig wlan0", (error, stdout) => {
        if (error) {
          console.error('Error reading iwconfig:', error);
          return res.status(500).json({error: 'Failed to get wifi info'});
        }

        const ssidMatch = stdout.match(/ESSID:"(.+)"/);
        const bitrateMatch = stdout.match(/Bit Rate=([0-9.]+ Mb\/s)/);
        const signalMatch = stdout.match(/Signal level=(.+ dBm)/);
        const qualityMatch = stdout.match(/Link Quality=(\d+)\/(\d+)/);

        let qualityPercent = 'N/A';
        if (qualityMatch) {
          const current = parseInt(qualityMatch[1], 10);
          const max = parseInt(qualityMatch[2], 10);
          qualityPercent = ((current / max) * 100).toFixed(0);
        }

        let wifi = {
          ssid: ssidMatch ? ssidMatch[1].trim() : "N/A",
          bitrate: bitrateMatch ? bitrateMatch[1].trim() : "N/A",
          signal: signalMatch ? signalMatch[1].trim() : "N/A",
          quality: qualityPercent
        };
        
        res.json({
          cpu: cpu.currentLoad.toFixed(1),
          mem: ((mem.active / mem.total) * 100).toFixed(1),
          disk: disk[0].use.toFixed(1),
          temp,
          uptime: formatUptime(uptime.uptime),
          wifi,
        });
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving stats');
  }
});

app.listen(port, () => {
  console.log(`Dashboard running at http://localhost:${port}`);
});


function formatUptime(seconds) {
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}