//var colors = chroma.scale(['#98FB98', '#32CD32']).colors(1000);
VanillaTilt.init(document.querySelector('.layout-center'), {
    max: 25,
    speed: 1500
});
var cvs1 = document.getElementById('m1');
var ctx1 = cvs1.getContext('2d');

//var cvs2 = document.getElementById('m2');
//var ctx2 = cvs2.getContext('2d');

cvs1.width = parseInt(cvs1.offsetWidth);
cvs1.height = parseInt(cvs1.offsetHeight);

//cvs2.width = parseInt(cvs2.offsetWidth);
//cvs2.height = parseInt(cvs2.offsetHeight);

var size1 = 30;
//var size2 =  cvs2.width / cvs1.width * size1;

var r = cvs1.width / size1;
//var delay = 10;

var colors = chroma.scale(['#ffffff', '#eee']).colors(1000);

for (var i = 0, l = size1; i < l; i++) {
    for (var j = 0, l = size1; j < l; j++) {
        drawBlock(colors[_.rand(0, colors.length-1)], i, j, ctx1, r);
    }
}
//colors = chroma.scale(['#feffef', '#fdffc1', '#32CD32']).colors(1000);
//for (var i = 0, l = size2; i < l; i++) {
    //for (var j = 0, l = size2; j < l; j++) {
        //drawBlock(colors[_.rand(0, colors.length-1)], i, j, ctx2, r);
    //}
//}
function drawBlock(c, x, y, ctx, r) {
    ctx.save();
    ctx.fillStyle = c;
    ctx.fillRect(x*r, y*r, r, r);
    ctx.restore();
}
function clearCanvas(cvs) {
    cvs.width = parseInt(cvs.offsetWidth);
    cvs.height = parseInt(cvs.offsetHeight);
}
