

export const displayPopOut = (x, y, w, h, col, p5) => {
    p5.strokeWeight(1);
    p5.stroke(col);
    p5.noFill();
    p5.rect(x, y, w, h);

    const dI = 1;
    const xInner = x + dI;
    const yInner = y + dI;
    const wInner = w - dI*2;
    const hInner = h -dI*2;
   
    p5.stroke(255);
    p5.noFill();
    p5.rect(xInner, yInner, wInner, hInner);
    // vertical innermost
    // p5.line(x+1, y+1, x+1, y+h-2);
    // horizontal innermost
    // p5.line(x+1, y+1, x+w-2, y+1);

    p5.stroke(150);
    // vertical, right side
    p5.line(xInner+wInner, yInner, xInner+wInner, yInner+hInner);
    // horizontal
    p5.line(xInner, yInner+hInner, xInner+wInner, yInner+hInner);

    p5.stroke(0);
    // vertical
    p5.line(x+w, y, x+w, y+h);
    // horizontal, underneath
    p5.line(x, y+h, x+w, y+h);
}

export const displayPopIn = (xOG, yOG, wOG, hOG, col, p5) => {
    p5.fill(200);
    p5.noStroke();
    p5.rect(xOG, yOG, wOG, hOG);

    const sp = 20;
    const w = wOG - sp;
    const h = hOG - sp;
    const x = xOG + sp/2;
    const y = yOG + sp/2;

    p5.strokeWeight(1);
    p5.stroke(col);
    p5.rect(x, y, w, h);

   
    p5.fill(255);
    p5.rect(x, y, w, h);

    p5.stroke(150);
    p5.noFill();
    p5.rect(x, y, w, h);


    p5.stroke(255);
    // vertical
    p5.line(x+w, y, x+w, y+h);
    // horizontal, underneath
    p5.line(x, y+h, x+w, y+h);

    p5.stroke(0);
    p5.noFill();
    p5.rect(x+1, y+1, w-2, h-2);

    p5.stroke(200);
    p5.line(x+1, y+h-1, x+w-2, y+h-1);

}