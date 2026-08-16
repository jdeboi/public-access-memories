import p5Types from "p5";

const DIRS = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
] as const;

// Muted industrial palette
const COLORS: [number, number, number][] = [
  [200, 80, 55],   // rust
  [55, 130, 205],  // steel blue
  [75, 180, 100],  // sage green
  [215, 160, 40],  // amber
  [165, 75, 185],  // dull violet
  [45, 185, 170],  // teal
  [225, 105, 50],  // burnt orange
  [145, 145, 225], // periwinkle
  [210, 50, 100],  // deep rose
];

interface Pipe {
  cx: number;
  cy: number;
  dx: number;
  dy: number;
  color: [number, number, number];
  alive: boolean;
}

export class Pipes2026 {
  private g: p5Types.Graphics | null = null;
  private pipes: Pipe[] = [];
  private grid: Uint8Array;
  private tick = 0;

  private readonly cols: number;
  private readonly rows: number;
  private readonly cs: number;   // pixel size per cell
  private readonly growEvery: number;
  private readonly maxPipes: number;
  private readonly fillThreshold: number;

  constructor(
    cols: number,
    rows: number,
    cellSize: number,
    growEvery = 5,
    maxPipes = 9,
    fillThreshold = 0.60,
  ) {
    this.cols = cols;
    this.rows = rows;
    this.cs = cellSize;
    this.growEvery = growEvery;
    this.maxPipes = maxPipes;
    this.fillThreshold = fillThreshold;
    this.grid = new Uint8Array(cols * rows);
  }

  init(p5: p5Types) {
    const w = this.cols * this.cs;
    const h = this.rows * this.cs;
    this.g = p5.createGraphics(w, h);
    this.g.pixelDensity(1);
    this.g.background(18, 16, 16);
    this.spawnAll();
  }

  update() {
    this.tick++;
    if (this.tick % this.growEvery !== 0) return;

    // Check fill ratio
    let filled = 0;
    for (let i = 0; i < this.grid.length; i++) if (this.grid[i]) filled++;
    if (filled / this.grid.length > this.fillThreshold) {
      this.reset();
      return;
    }

    let anyAlive = false;
    for (const p of this.pipes) {
      if (!p.alive) continue;
      if (this.growPipe(p)) anyAlive = true;
      else p.alive = false;
    }

    if (!anyAlive) this.reset();
  }

  getGraphics(): p5Types.Graphics | null {
    return this.g;
  }

  // ─── private ────────────────────────────────────────────────────────────────

  private idx(cx: number, cy: number) {
    return cy * this.cols + cx;
  }

  private spawnAll() {
    this.pipes = [];
    for (let i = 0; i < this.maxPipes; i++) this.spawnOne();
  }

  private spawnOne() {
    for (let t = 0; t < 300; t++) {
      const cx = Math.floor(Math.random() * this.cols);
      const cy = Math.floor(Math.random() * this.rows);
      if (!this.grid[this.idx(cx, cy)]) {
        this.grid[this.idx(cx, cy)] = 1;
        const dir = DIRS[Math.floor(Math.random() * 4)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.pipes.push({ cx, cy, dx: dir.dx, dy: dir.dy, color, alive: true });
        return;
      }
    }
  }

  private growPipe(pipe: Pipe): boolean {
    if (!this.g) return false;

    // Build candidates: no U-turn; prefer forward 70% of the time
    const fwd = { dx: pipe.dx, dy: pipe.dy };
    const side = DIRS.filter(
      (d) => !(d.dx === -pipe.dx && d.dy === -pipe.dy) &&
             !(d.dx === pipe.dx && d.dy === pipe.dy),
    );
    const candidates =
      Math.random() < 0.70
        ? [fwd, ...this.shuffled(side)]
        : [...this.shuffled(side), fwd];

    for (const dir of candidates) {
      const nx = pipe.cx + dir.dx;
      const ny = pipe.cy + dir.dy;
      if (nx < 0 || ny < 0 || nx >= this.cols || ny >= this.rows) continue;
      if (this.grid[this.idx(nx, ny)]) continue;

      const turning = dir.dx !== pipe.dx || dir.dy !== pipe.dy;
      this.drawSegment(pipe, nx, ny, dir, turning);
      pipe.dx = dir.dx;
      pipe.dy = dir.dy;
      pipe.cx = nx;
      pipe.cy = ny;
      this.grid[this.idx(nx, ny)] = 1;
      return true;
    }
    return false;
  }

  private drawSegment(
    pipe: Pipe,
    nx: number,
    ny: number,
    dir: { dx: number; dy: number },
    turning: boolean,
  ) {
    const g = this.g!;
    const half = this.cs / 2;
    const [r, gr, b] = pipe.color;
    const thick = Math.max(5, this.cs * 0.32);

    const x0 = pipe.cx * this.cs + half;
    const y0 = pipe.cy * this.cs + half;
    const x1 = nx * this.cs + half;
    const y1 = ny * this.cs + half;

    g.push();
    g.strokeWeight(thick);
    g.strokeCap(g.SQUARE);
    g.stroke(r, gr, b);
    g.noFill();
    g.line(x0, y0, x1, y1);

    // joint sphere at destination
    const jointD = thick * 1.45;
    g.noStroke();
    g.fill(r, gr, b);
    g.ellipse(x1, y1, jointD, jointD);

    // highlight at elbow (where we turned)
    if (turning) {
      g.ellipse(x0, y0, jointD, jointD);
    }
    g.pop();
  }

  private reset() {
    if (!this.g) return;
    this.grid.fill(0);
    this.g.background(18, 16, 16);
    this.spawnAll();
  }

  private shuffled<T>(arr: readonly T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
