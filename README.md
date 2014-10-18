smed3
=====

Sollentuna Södra Scoutkårs medlemsregister v.3


#installation:
install git
install node

git clone https://github.com/SollentunaSodraScoutkar/smed3.git

GUI:
open commandprompt
cd smed3\gui
npm start

(Starts web server listening to port 8000)

Server:
open commandprompt
npm install -g nodemon (installs self-restarting node server)
nodemon server.js

(Starts rest server on port 8080)

To test, open browser on http://localhost:8000/app






