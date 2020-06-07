1. how to use browserify 
 -----------------------
 1. it will give you the access to use rquire() function into client side javascript 

 steps: 
  --> first install browserify as dev-dependensis 
  ---> -->cmd: (npm i browserify -g) C:\Users\milon\AppData\Roaming\npm\node_modules\browserify\bin\cmd.js
  (make sure you are not using powershell in vscode-use git bash or cmd)
  --> bundle all of your client side script where you need to use require().
  --> steps for how to do it
  --> --> 1. cmd: browserify ./public/assets/script.js -o dist/bundle.js

------------------------------------------------------------
  browserify public/assets/script.js -o dist/bundle.js
  we make this into a npm script (npm run bundlejs)
------------------------------------------------------------