/* 
Implementation of the main algorithm in 

Daniel Lemire, Martin Brooks and Yuhong Yan, An Optimal Linear Time Algorithm for Quasi-Monotonic Segmentation. International Journal of Computer Mathematics 86 (7), 2009.

http://arxiv.org/abs/0709.1166

This script assumes jsc but can be adapted to other javascript engines. */




/**
This is the function you could care about.
*/
function computeScaleLabels(X) {

    /*    
     We select the extrema. */
    
    var E = []
    
    E.push(X[0])
    for (var i = 1; i < X.length - 1; i++) {
        if(X[i] == X[i-1]) {
            // do not register
        } else if((X[i] >= X[i-1]) && (X[i] >= X[i+1])) {
              E[i] = X[i]
            
        } else if((X[i] <= X[i-1]) && (X[i] <= X[i+1])) {
              E[i] = X[i]
        }
    }
    if(X[X.length-1] == E[E.length-1]) {
      E.splice(E.length-1,1)
      E.push(X[X.length - 1])
    } else 
      E.push(X[X.length - 1])
    
    /**
    If E.length < 2 we should abort
    **/
    
    /*
    STEP.
    
    We execute the main algorithm, creating the scalelabel array.
    
    */
    
    isMin = (E[0] < E[1])
    S=[]
    scalelabel = []
    for (var i in E) {
      while((S.length > 2) && (( (!isMin) && (E[i]>E[S[1]]))||(isMin && (E[i]<E[S[1]]))) ){
        var scale = Math.abs(E[S[1]]-E[S[0]])
        scalelabel[S[0]] = scale
        scalelabel[S[1]] = scale
        S.splice(0,2)
      }
      if((S.length == 2) && (((!isMin) && (E[i]>E[S[1]]))||((isMin) && (E[i]<E[S[1]]))) ){
        var scale = Math.abs(E[S[1]]-E[S[0]])
        scalelabel[S[1]] = scale
        S.splice(1,1)
      }
      isMin = ! isMin
      S.splice(0,0,i)
    }
    while(S.length > 2) {
        var scale = Math.abs(E[S[1]]-E[S[0]])
        scalelabel[S[0]] = scale
        S.splice(0,1)
    }
    var scale = Math.abs(E[S[1]]-E[S[0]])
    scalelabel[S[0]] = scale
    scalelabel[S[1]] = scale
    S.splice(0,2)
    return scalelabel

}

function selectSignificantExtrema(X, tolerance) {

    scalelabel = computeScaleLabels(X)
    
    answer = []
    for (var i in scalelabel) {
        if(scalelabel[i] >= tolerance) {
            answer.push(i)
        }
    }
    return answer

}




/**
* Produces a piece-wise monotone approximation. X contains
the speeds, and indexes the segmentation points.

Example: Xmon = piecewiseMonotone(X,selectSignificantExtrema(X, 4))
*/
function piecewiseMonotone(X, indexes) {
    answer = []
    for(var i = 0; i < indexes.length - 1 ; ++ i) {
        var a = X[indexes[i]]
        var b = X[indexes[i+1]]
        Xmin = []
        Xmax = []
        if(a > b) {
            print("#decreasing from "+a+" to "+b+" starting at "+indexes[i])
            Xmin[indexes[i]] = X[indexes[i]]
            Xmax[indexes[i+1]] = X[indexes[i+1]]
            for(var j = Number(indexes[i]) + 1; j <= indexes[i+1];++j) {
                if(X[j] < Xmin[j-1])
                  Xmin[j] = X[j]
                else
                  Xmin[j] = Xmin[j-1]  
            }
            for(var j = Number(indexes[i+1]) - 1; j >= indexes[i];--j) {
                if(X[j] < Xmax[j+1])
                  Xmax[j] = Xmax[j+1]
                else
                  Xmax[j] = X[j]  
            }            
        } else {
            print("#increasing from "+a+" to "+b+" starting at "+indexes[i])
            Xmin[indexes[i+1]] = X[indexes[i+1]]
            Xmax[indexes[i]] = X[indexes[i]]
            var br = Number(indexes[i])+1
            for(var j = Number(indexes[i]) + 1; j <= indexes[i+1];++j) {
                if(X[j] > Xmax[j-1])
                  Xmax[j] = X[j]
                else
                  Xmax[j] = Xmax[j-1]  
            }
            for(var j = Number(indexes[i+1]) - 1; j >= indexes[i];--j) {
                if(X[j] > Xmin[j+1])
                  Xmin[j] = Xmin[j+1]
                else
                  Xmin[j] = X[j]  
            }            
        }
        
        for(var j in Xmax) {
            answer[j] = (Xmax[j]+Xmin[j])/2.0
        }
        
    }
    return answer

}









/* 
STEP.

We extract just the speeds from the JSON. We assume that time indexes 
are in increasing order. We assume at least two data points. 

*/


var data = readline()
var array = []
while(data) {
  array.push(JSON.parse(data))
  data = readline()
}



var myX = []
for (var i = 0; i < array.length; i++) {
    myX[i] = Number(array[i]["GPS_Speed"])
}

var labels = computeScaleLabels(myX)

testscales = [0,10]
for (var i in testscales) {
  print ("# analysis at scale = "+testscales[i])
  var indexes = selectSignificantExtrema(myX, testscales[i])
  Xmon =  piecewiseMonotone(myX,selectSignificantExtrema(myX, testscales[i]))
  for (var j in Xmon) {
    print(j+"\t"+Xmon[j])
  }
  print()
}
