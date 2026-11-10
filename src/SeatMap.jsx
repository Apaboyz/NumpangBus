import { Box, Stack, ToggleButton, Typography } from '@mui/material';
import { ROWS, LETTERS } from './utils';

const SELECTED_BG = '#FFC107';

function Seat({ id, status, onClick }) {
  return (
    <ToggleButton
      value={id}
      selected={status === 'selected'}
      disabled={status === 'taken'}
      onChange={() => onClick(id)}
      aria-label={`Kursi ${id}, ${status === 'taken' ? 'terisi' : status === 'selected' ? 'dipilih' : 'tersedia'}`}
      sx={{
        width: { xs: 46, sm: 58 },
        height: { xs: 46, sm: 54 },
        p: 0,
        fontWeight: 700,
        fontSize: { xs: 13, sm: 15 },
        borderRadius: 1.5,
        border: '2px solid transparent',
        bgcolor: 'success.main',
        color: 'success.contrastText',
        '&:hover': { bgcolor: 'success.dark' },
        '&.Mui-selected, &.Mui-selected:hover': {
          bgcolor: SELECTED_BG,
          color: '#1a1a1a',
          borderColor: '#8a6500',
        },
        '&.Mui-disabled': {
          bgcolor: 'action.disabledBackground',
          color: 'text.disabled',
          border: '2px solid transparent',
        },
      }}
    >
      {id}
    </ToggleButton>
  );
}

function LegendItem({ color, label, border }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ width: 18, height: 18, borderRadius: 0.75, bgcolor: color, border: border || 'none' }} />
      <Typography variant="body2">{label}</Typography>
    </Stack>
  );
}

export default function SeatMap({ taken, selected, onToggle }) {
  const status = (id) => (taken.includes(id) ? 'taken' : selected.includes(id) ? 'selected' : 'free');

  return (
    <Stack spacing={2} alignItems="center">
      <Stack direction="row" spacing={2.5} flexWrap="wrap" justifyContent="center" useFlexGap>
        <LegendItem color="success.main" label="Tersedia" />
        <LegendItem color={SELECTED_BG} label="Dipilih" border="2px solid #8a6500" />
        <LegendItem color="action.disabledBackground" label="Terisi" />
      </Stack>

      <Box
        sx={{
          border: 2,
          borderColor: 'divider',
          borderRadius: 4,
          p: { xs: 1.5, sm: 2.5 },
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mb={1.5}>
          Bagian depan (sopir)
        </Typography>
        <Stack spacing={1}>
          {Array.from({ length: ROWS }, (_, i) => i + 1).map((row) => (
            <Stack key={row} direction="row" justifyContent="center" alignItems="center" spacing={1}>
              {LETTERS.slice(0, 2).map((l) => (
                <Seat key={l} id={`${row}${l}`} status={status(`${row}${l}`)} onClick={onToggle} />
              ))}
              <Box sx={{ width: { xs: 18, sm: 36 } }} aria-hidden />
              {LETTERS.slice(2).map((l) => (
                <Seat key={l} id={`${row}${l}`} status={status(`${row}${l}`)} onClick={onToggle} />
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
