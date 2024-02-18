var arr = [79, 5, 18, 5, 32, 1, 16, 1, 82, 13];
var sorted = arr.slice().sort(function(a,b){return b-a})
var ranks = arr.map(function(v){ return sorted.indexOf(v)+1 });
console.log(sorted);