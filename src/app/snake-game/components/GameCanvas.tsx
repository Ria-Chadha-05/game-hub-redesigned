'use client';
import { useEffect, useRef } from 'react';

interface Position { x: number; y: number; }
interface Props { snake: Position[]; food: Position; gridSize: number; cellSize: number; isGameOver: boolean; isPaused: boolean; }

const GameCanvas = ({ snake, food, gridSize, cellSize, isGameOver, isPaused }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = gridSize * cellSize;

    ctx.fillStyle = '#060606';
    ctx.fillRect(0, 0, size, size);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath(); ctx.moveTo(i * cellSize, 0); ctx.lineTo(i * cellSize, size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * cellSize); ctx.lineTo(size, i * cellSize); ctx.stroke();
    }

    // Snake
    snake.forEach((seg, idx) => {
      const x = seg.x * cellSize + 1;
      const y = seg.y * cellSize + 1;
      const w = cellSize - 2;
      const alpha = idx === 0 ? 1 : Math.max(0.4, 1 - idx * 0.04);
      ctx.fillStyle = idx === 0
        ? `rgba(34,197,94,${alpha})`
        : `rgba(22,163,74,${alpha})`;
      ctx.beginPath();
      ctx.roundRect(x, y, w, w, 3);
      ctx.fill();
      // Head gloss
      if (idx === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fillRect(x + 3, y + 3, w / 2, w / 3);
      }
    });

    // Food
    const fx = food.x * cellSize + cellSize / 2;
    const fy = food.y * cellSize + cellSize / 2;
    ctx.save();
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(fx, fy, cellSize / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Overlay
    if (isGameOver || isPaused) {
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Space Grotesk, Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isGameOver ? 'GAME OVER' : 'PAUSED', size / 2, size / 2 - 8);
      if (isGameOver) {
        ctx.font = '13px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText('Press Play Again to restart', size / 2, size / 2 + 14);
      }
    }
  }, [snake, food, gridSize, cellSize, isGameOver, isPaused]);

  return (
    <div className="flex justify-center">
      <div className="p-3 bg-[#0c0c0c] border border-white/[0.06] rounded-3xl shadow-[0_0_40px_rgba(34,197,94,0.08)]">
        <canvas ref={canvasRef} width={gridSize * cellSize} height={gridSize * cellSize} className="rounded-2xl block" />
      </div>
    </div>
  );
};

export default GameCanvas;
