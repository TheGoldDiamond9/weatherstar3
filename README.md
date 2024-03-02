# Weatherscan Star 3000 Emulator
Weather Star 3000 emulation in HTML/JS/CSS

### This is in Beta

## Installation Instructions:

## NOTE: AUTOMATIC LOCATION FINDING DOES NOT WORK
## NOTE: ONLY FLAVORS A-L WORK AT THE MOMENT. USING OTHER FLAVORS WILL RESULT IN AN UNFINISHED FLAVOR PRODUCT
## NOTE: THE LOCATIONS FOR REGIONAL CONDITIONS AND HOURLY OBSERVATIONS ARE THE SAME. I'M GONNA FIX THAT

## Running locally (NODE.JS):
1. Download & Install [node.js LTS](https://nodejs.org/en/)
2. Get weather.com API key.
3. Navigate to `/webroot/js` and open `config.js`.
4. Find the line with `var api_key = 'YOUR_API_KEY'`. Replace YOUR_API_KEY with the weather.com API key.
5. In terminal, run `npm install --production` in the root folder of this project. This will install any dependencies.
6. In terminal, run `npm start` in the root folder of this project. This will start a local web server.
7. Follow the link in the console output.
8. Set location using the following template: servercode:/?Location Name

## Running Locally (COMMAND PROMPT):
1. Get weather.com API key.
2. In command prompt, navigate to `/webroot/js` and open `config.js`.
3. Find the line with `var api_key = 'YOUR_API_KEY'`. Replace YOUR_API_KEY with the weather.com API key.
4. In terminal, run `npm install --production` in the root folder of this project. This will install any dependencies.
5. In terminal, run `npm start` in the root folder of this project. This will start a local web server.
6. An internet browser tab will open in your web browser.
7. Set location using the following template: servercode:/?Location Name
