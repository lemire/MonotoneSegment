## MonotoneSegment

JavaScript implementation of the main algorithm in 

- Daniel Lemire, Martin Brooks and Yuhong Yan, An Optimal Linear Time Algorithm for Quasi-Monotonic Segmentation. International Journal of Computer Mathematics 86 (7), 2009. http://arxiv.org/abs/0709.1166


This code was used in the preparation of the following manuscript : 

- Perrine Ruer, Charles Gouin-Vallerand, Le Zhang, Daniel Lemire, and Evelyne F.  Vallières,  An analysis tool for the contextual information from field experiments on driving fatigue,CONTEXT 2015, 2015.


Java version
======

The code was ported in Java for the Android platform.

https://github.com/limvi-licef/AR-driving-assistant/blob/master/AndroidApp/app/src/main/java/com/limvi_licef/ar_driving_assistant/algorithms/MonotoneSegmentationAlgorithm.java


Usage
======

The script is just meant a demo. Please read the code
and adapt it to your own purpose.


Assuming you have a mac, you can run it in a command line...
```bash
sudo ln -s /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Resources/jsc /bin/jsc
chmod +x samplescript.js
cat VehicleRunInfo.json | jsc samplescript.js 
```

If you have gnuplot installed:

```bash
cat VehicleRunInfo.json | jsc samplescript.js > test.data && gnuplot test.gnuplot
```
