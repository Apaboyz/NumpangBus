import { Box } from '@mui/material';
import { hashStr } from './utils';

const N = 25;

// 1 = kotak gelap pada pola sudut, 0 = kosong, null = di luar area sudut
function finder(r, c) {
  const spots = [[0, 0], [0, N - 7], [N - 7, 0]];
  for (const [R, C] of spots) {
    const dr = r - R;
    const dc = c - C;
    if (dr >= -1 && dr <= 7 && dc >= -1 && dc <= 7) {
      if (dr < 0 || dr > 6 || dc < 0 || dc > 6) return 0;
      const edge = dr === 0 || dr === 6 || dc === 0 || dc === 6;
      const core = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
      return edge || core ? 1 : 0;
    }
  }
  return null;
}

// Gambar QR CONTOH (bukan kode QR yang valid)
export default function QrSample({ seed = 'simulasi', size = 200 }) {
  let s = hashStr(seed) || 1;
  const rand = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const cells = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const f = finder(r, c);
      const on = f === null ? rand() > 0.5 : f === 1;
      if (on) cells.push(<rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" />);
    }
  }
  return (
    <Box
      role="img"
      aria-label="Contoh kode QR (simulasi)"
      sx={{ bgcolor: '#fff', p: 1.5, borderRadius: 2, display: 'inline-block', lineHeight: 0 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges" fill="#111">
        {cells}
      </svg>
    </Box>
  );
}
