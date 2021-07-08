class Line
{
    constructor(m, rotPoint)
    {
        this.m = m;
        this.rotPoint = rotPoint;
        this.getPoint = function(x) { return new Vec2(x, this.m * (x - this.rotPoint.x) + this.rotPoint.y); };
        this.speed = 0.005;
        points[0].taken = true;
        points[0].hits++;
    }

    getPoint(x) {  } // it will be overridden in the constructor
    
    update()
    {
        this.rotate(this.speed);
        this.calculateRotPoint();
    }

    rotate(angle)
    {
        const rot = getRot(angle);
        const a = this.getPoint(0), b = this.getPoint(width);
        [ a, b ].forEach(v => v.sub(this.rotPoint).multMat(rot));
        this.m = b.copy().sub(a).slope();
    }

    calculateRotPoint()
    {
        const a = this.getPoint(0), b = this.getPoint(width);
        const edge = b.copy().sub(a).normalize().multMat(getRot(Math.PI / 2));

        const lineProj = edge.dot(a);
        const tolerance = 2;
        for(let i = 0; i < points.length; ++i) {
            const point = points[i];
            const pointProj = edge.dot(point.pos);
            
            if(Math.abs(lineProj - pointProj) < tolerance) {
                if(point.taken) continue;
                this.rotPoint = point.pos.copy();
                point.taken = true;
                point.hits++;
                sounds.knock.cloneNode().play();
            } else {
                point.taken = false;
            }
        }
    }

    render()
    {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(...this.getPoint(0));
        ctx.lineTo(...this.getPoint(width));
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}