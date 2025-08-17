# Raspberry Pi Dashboard  

![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-C51A4A?logo=raspberrypi&logoColor=white) 
![License](https://img.shields.io/badge/License-MIT-blue)   
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?logo=node.js&logoColor=white) 
![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)     

A lightweight web-based dashboard to **monitor system performance** on a Raspberry Pi in real time.  
It tracks CPU load, memory, disk usage, temperature, uptime, and Wi-Fi quality, with dynamic charts. 


## 🚀 Features  

- 🌡️ **CPU Temperature Monitoring**  
- 🖥️ **CPU Load Percentage**  
- 💾 **RAM Usage Tracking**  
- 🗄️ **Disk Usage Monitoring**  
- ⏳ **System Uptime**  
- 📶 **Wi-Fi Details** (SSID, Bitrate, Signal Strength, Link Quality)  
- 📈 **Live Charts** for CPU temperature and RAM usage   

## 🛠️ Tech Stack  

- **Backend**: Node.js, Express, systeminformation, vcgencmd (Raspberry Pi), iwconfig (Wi-Fi stats)  
- **Frontend**: HTML, CSS, JavaScript  
- **Charts**: Chart.js  
- **Platform**: Raspberry Pi (tested on Raspbian OS)  


## ⚙️ Installation  

### 1. Clone the repository  
```bash
git clone https://github.com/Ioannis0228/Pi-Dashboard.git
cd Pi-Dashboard
```

### 2. Install dependencies
Make sure you have Node.js installed.
```bash
npm install
```

### 3. Start the server
```bash
node server.js
```
The dashboard will be running at `http://localhost:3000`


## 👨‍💻 Author
Developed by Ioannis Orthodoxou – Electrical & Computer Engineering Student 2025.
Feel free to connect and contribute! 🚀

