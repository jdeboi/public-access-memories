type Post = {
  id: string;
  tags: string[]; // up to 5 per your note
};

type XY = { x: number; y: number };

export function layoutPosts(
  posts: Post[],
  maxW = 2000,
  maxH = 2000
): Record<string, XY> {
  const W = maxW,
    H = maxH;
  const cx = W / 2,
    cy = H / 2;
  const R = 0.38 * Math.min(W, H); // circle radius for tag anchors

  // --- collect unique tags
  const tagSet = new Set<string>();
  for (const p of posts) for (const t of p.tags) if (t) tagSet.add(t);
  const tags = Array.from(tagSet);

  // --- deterministic angle per tag via hash (stable across runs)
  const tagAngle = new Map<string, number>();
  for (const t of tags) {
    const h = frac(hash32(t)); // 0..1
    const angle = h * Math.PI * 2; // 0..2π
    tagAngle.set(t, angle);
  }

  // --- anchor position for each tag on a circle
  const tagAnchor = new Map<string, XY>();
  for (const t of tags) {
    const a = tagAngle.get(t)!;
    tagAnchor.set(t, { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) });
  }

  // --- initial position = average of anchors (or center if no tags)
  const pos: Record<string, XY> = {};
  for (const p of posts) {
    const valid = (p.tags || []).filter(Boolean);
    if (valid.length === 0) {
      pos[p.id] = jitter({ x: cx, y: cy }, p.id, 12);
      continue;
    }
    let x = 0,
      y = 0;
    for (const t of valid) {
      const a = tagAnchor.get(t);
      if (a) {
        x += a.x;
        y += a.y;
      }
    }
    x /= valid.length;
    y /= valid.length;

    // small deterministic jitter so points in same spot don't stack
    pos[p.id] = jitter({ x, y }, p.id, 18);
  }

  // --- quick collision separation (2 light passes)
  const ITEM_R = 60; // "visual radius" of a post-it; tweak to your size
  const entries = posts.map((p) => ({ id: p.id, ...pos[p.id] }));

  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const a = entries[i],
          b = entries[j];
        let dx = a.x - b.x,
          dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        const minD = ITEM_R * 1.1; // a bit of air
        if (d2 > 0 && d2 < minD * minD) {
          const d = Math.sqrt(d2);
          const push = (minD - d) * 0.5;
          dx /= d;
          dy /= d;
          a.x += dx * push;
          a.y += dy * push;
          b.x -= dx * push;
          b.y -= dy * push;
        }
      }
    }
  }

  // --- clamp to bounds
  for (const e of entries) {
    e.x = clamp(e.x, 40, W - 40);
    e.y = clamp(e.y, 40, H - 40);
    pos[e.id] = { x: e.x, y: e.y };
  }

  return pos;

  // ---------- helpers ----------
  function clamp(v: number, lo: number, hi: number) {
    return Math.max(lo, Math.min(hi, v));
  }
  function jitter(p: XY, key: string, r: number): XY {
    const a = frac(hash32(key + ":a")) * Math.PI * 2;
    const m = (frac(hash32(key + ":m")) - 0.5) * 2; // -1..1
    return { x: p.x + Math.cos(a) * r * m, y: p.y + Math.sin(a) * r * m };
  }
  function frac(n: number) {
    return n - Math.floor(n);
  }
  function hash32(s: string) {
    // small fast string hash -> 0..2^32-1
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    // xorshift finalization
    h += (h << 13) >>> 0;
    h ^= h >>> 7;
    h += (h << 3) >>> 0;
    h ^= h >>> 17;
    h += (h << 5) >>> 0;
    return h >>> 0;
  }
}

function hashFNV1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0; // unsigned
}

export const getTagColor = (tag: string): string => {
  const colors = [
    "#f2c6b4",
    "#d5c1e5",
    "#e7c7da",
    "#b7cde0",
    "#f6e2cf",
    "#e4a299",
  ];
  const index = Math.abs(hashFNV1a(tag)) % colors.length;
  return colors[index];
};
