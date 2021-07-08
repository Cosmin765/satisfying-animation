class Point
{
    constructor(x, y)
    {
        this.pos = new Vec2(x, y);
        this.color = `rgb(${random(100, 255)}, ${random(100, 255)}, ${random(100, 255)})`;
        this.r = 5;
        this.taken = false;
        this.hits = 0;
    }

    render()
    {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.translate(...this.pos);
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
        ctx.font = "20px Arial";
        ctx.fillText(this.hits, -5, 40);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}