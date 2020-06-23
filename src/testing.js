function make2Darray(cols,rows){
    var arr = new Array(rows);
    for (var i = 0; i < arr.length; i++){
        arr[i] = new Array(cols);
    }
    return arr;
}