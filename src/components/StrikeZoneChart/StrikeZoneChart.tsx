import './StrikeZoneChart.css';
import { useMemo } from 'react';
import type { FC } from 'react';
import type { PitchEvent } from '@/types.mlb';
import { cn } from '@/utils/cn';

interface StrikeZoneChartProps {
  pitchPayload: Array<PitchEvent>;
}

export const StrikeZoneChart: FC<StrikeZoneChartProps> = ({ pitchPayload }) => {
  const elements = useMemo(() => {
    // Filter out entries without pitchData
    const validPitches = pitchPayload.filter(
      (p) => p.pitchData && p.pitchData.coordinates,
    );
    if (validPitches.length === 0) return null;

    const width = 100;
    const height = 125;
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const boxWidth = plotWidth * 0.15;
    const boxHeight = plotHeight * 0.25;

    const scaleX = (val: number) => margin.left + ((val + 2) / 4) * plotWidth;
    const scaleY = (val: number) => plotHeight - ((val + 1) / 6) * plotHeight;

    const { strikeZoneTop: top, strikeZoneBottom: bottom } =
      validPitches[0].pitchData;
    const left = -0.71;
    const right = 0.71;

    // Left batter box in perspective
    const pxL0 = scaleX(left);
    const pyL0 = scaleY(0);
    const pxL1 = scaleX(-0.85);
    const pyL1 = scaleY(-0.5);
    const dxL = pxL1 - scaleX(-0.71);
    const dyL = pyL1 - scaleY(0);
    const kL = boxHeight / Math.abs(dyL);
    const A = { x: pxL0 - boxWidth, y: pyL0 };
    const B = { x: pxL0, y: pyL0 };
    const C = { x: A.x + dxL * kL, y: A.y + dyL * kL };
    const D = { x: B.x + dxL * kL, y: B.y + dyL * kL };
    const batterBoxLeft = (
      <polygon
        key="batbox-left"
        points={`${A.x},${A.y} ${B.x},${B.y} ${D.x},${D.y} ${C.x},${C.y}`}
        className="batter-box"
        stroke="#444"
        fill="none"
      />
    );

    // Right batter box in perspective
    const pxR0 = scaleX(right);
    const pyR0 = scaleY(0);
    const pxR1 = scaleX(0.85);
    const pyR1 = scaleY(-0.5);
    const dxR = pxR1 - scaleX(0.71);
    const dyR = pyR1 - scaleY(0);
    const kR = boxHeight / Math.abs(dyR);
    const E = { x: pxR0, y: pyR0 };
    const F = { x: pxR0 + boxWidth, y: pyR0 };
    const G = { x: E.x + dxR * kR, y: E.y + dyR * kR };
    const H = { x: F.x + dxR * kR, y: F.y + dyR * kR };
    const batterBoxRight = (
      <polygon
        key="batbox-right"
        points={`${E.x},${E.y} ${F.x},${F.y} ${H.x},${H.y} ${G.x},${G.y}`}
        className="batter-box"
        stroke="#444"
        fill="none"
      />
    );

    // Strike zone
    const strikeZone = (
      <rect
        key="strike-zone"
        x={scaleX(left)}
        y={scaleY(top)}
        width={scaleX(right) - scaleX(left)}
        height={(scaleX(right) - scaleX(left)) * 1.26}
        className="strike-zone"
      />
    );

    // Zone dimensions for guides
    const zoneWidth = scaleX(right) - scaleX(left);
    const zoneHeight = zoneWidth * 1.26;
    const zoneTopY = scaleY(top);
    const pitchScaleFactor = zoneHeight / (top - bottom);
    const scaleYPitch = (val: number) =>
      zoneTopY + (top - val) * pitchScaleFactor;

    // Grid lines adjusted to new aspect ratio
    const verticalLines = [1 / 3, 2 / 3].map((t, idx) => (
      <line
        key={`vline-${idx}`}
        x1={scaleX(left + (right - left) * t)}
        x2={scaleX(left + (right - left) * t)}
        y1={zoneTopY}
        y2={zoneTopY + zoneHeight}
        className="grid-line"
      />
    ));
    const horizontalLines = [1 / 3, 2 / 3].map((t, idx) => (
      <line
        key={`hline-${idx}`}
        x1={scaleX(left)}
        x2={scaleX(right)}
        y1={zoneTopY + zoneHeight * t}
        y2={zoneTopY + zoneHeight * t}
        className="grid-line"
      />
    ));

    // Home plate
    const plateCoords = [
      [-0.71, 0],
      [-0.85, -0.5],
      [0, -1],
      [0.85, -0.5],
      [0.71, 0],
    ];
    const platePath = plateCoords
      .map(([x, y]) => `${scaleX(x)},${scaleY(y)}`)
      .join(' ');
    const plateElem = (
      <polygon key="plate" points={platePath} className="plate" />
    );

    // Pitches
    const pitches = validPitches.flatMap((p, i) => {
      const { pX, pZ } = p.pitchData.coordinates;
      const x = scaleX(pX);
      const y = scaleYPitch(pZ);

      return [
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={y}
          r={3}
          className={cn(
            'pitch-dot',
            p.details.isStrike && 'is-strike',
            p.details.isBall && 'is-ball',
            p.details.isInPlay && 'is-in-play',
          )}
        />,
        <text
          key={`label-${i}`}
          x={x}
          y={y * 1.005}
          className={cn(
            'pitch-label',
            p.details.isStrike && 'is-strike',
            p.details.isBall && 'is-ball',
            p.details.isInPlay && 'is-in-play',
          )}
        >
          {p.pitchNumber}
        </text>,
      ];
    });

    return [
      batterBoxLeft,
      batterBoxRight,
      strikeZone,
      ...verticalLines,
      ...horizontalLines,
      plateElem,
      ...pitches,
    ];
  }, [pitchPayload]);

  return (
    <svg
      className="strike-zone-chart"
      viewBox="0 0 100 125"
      preserveAspectRatio="xMidYMid meet"
    >
      {elements}
    </svg>
  );
};
