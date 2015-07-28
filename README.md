JavaScript implementation of the main algorithm in 

Daniel Lemire, Martin Brooks and Yuhong Yan, An Optimal Linear Time Algorithm for Quasi-Monotonic Segmentation. International Journal of Computer Mathematics 86 (7), 2009.

http://arxiv.org/abs/0709.1166


Usage
======

The script is just meant a demo. Please read the code
and adapt it to your own purpose.


Assuming you have a mac, you can run it in a command line...

sudo ln -s /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Resources/jsc /bin/jsc

chmod +x samplescript.js

cat VehicleRunInfo.json | jsc samplescript.js 

If you have gnuplot installed:


cat VehicleRunInfo.json | jsc samplescript.js > test.data && gnuplot test.gnuplot