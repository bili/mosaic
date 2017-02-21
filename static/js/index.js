var mosaic = new Vue({
    el: '.app',
    data: {
        cvs: null,
        ctx: null,
        size: 30
    },
    computed: {
    },
    mounted: function() {
        this.cvs = document.getElementById('m');
        this.ctx = this.cvs.getContext('2d');
        this.cvs.width = parseInt(this.cvs.offsetWidth);
        this.cvs.height = parseInt(this.cvs.offsetHeight);
        this.r = this.cvs.width / this.size;
        var colors = chroma.scale(['#00ff9d', '#b2ff00', '#333']).colors(1000);
        var x = y = 0;
        for (var i = 0, l = this.size; i < l; i++) {
            for (var j = 0, l = this.size; j < l; j++) {
                drawBlock.bind(this)(colors[_.rand(0, colors.length-1)], i, j);
            }
        }
    }
});
function drawBlock(c, x, y) {
    var ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = c;
    ctx.fillRect(x*this.r, y*this.r, this.r, this.r);
    ctx.restore();
}
function clearCanvas() {
    this.cvs.width = parseInt(this.cvs.offsetWidth);
    this.cvs.height = parseInt(this.cvs.offsetHeight);
}