import React, {useEffect, useRef} from 'react';
import {
	interpolate,
	interpolateColors,
	random,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';

const positionNoise = new SimplexNoise('position');
const colorNoise = new SimplexNoise('color');
const blurNoise = new SimplexNoise('blur');
const opacityNoise = new SimplexNoise('opacity');

export const Strobe: React.FC<{
	type: 'shines' | 'rays';
}> = ({type}) => {
	const ref = useRef<HTMLCanvasElement>(null);
	const {width, height, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const progress = spring({
		fps,
		frame,
		config: {
			mass: 3,
			damping: 200,
		},
	});

	useEffect(() => {
		const {current} = ref;
		if (!current) {
			return;
		}
		const context = current.getContext('2d') as CanvasRenderingContext2D;
		context.clearRect(0, 0, width, height);
		const lines = type === 'shines' ? 120 : 40;
		for (let i = 0; i < lines; i++) {
			const fullCircle =
				Math.sqrt(width * width + height * height) *
				(0.7 + interpolate(random(`progress-${i}`), [0, 1], [-0.1, 0.1])) *
				progress;
			const alpha = interpolate(
				blurNoise.noise2D(0, i),
				[-1, 1],
				[0, type === 'shines' ? 0.04 : 0.005]
			);
			const color =
				type === 'shines'
					? interpolateColors(
							colorNoise.noise2D(0, i / 20),
							[-1.5, 1],
							['#4bb6ab', '#6af1e1']
					  )
					: 'white';
			if (type === 'shines') {
				context.filter = 'blur(5px)';
			} else {
				context.filter = 'blur(2px)';
			}
			const alphaRange = type === 'rays' ? [0.2, 0.8] : [0.1, 0.13];
			context.globalAlpha = interpolate(
				opacityNoise.noise2D(0, i / 10),
				[-1, 1],
				alphaRange
			);
			context.fillStyle = `${color}`;
			context.beginPath();
			const rotation =
				interpolate(i, [0, lines], [0, Math.PI * 0.5]) -
				Math.PI * 0.75 +
				interpolate(
					positionNoise.noise2D(0, i / 10),
					[-1, 1],
					[-Math.PI * 0.02, Math.PI * 0.02]
				);
			const startX = Math.sin(rotation) * 20 + width / 2;
			const startY = Math.cos(rotation) * 20 + height / 2;
			const edgeX1 = Math.sin(rotation + alpha) * fullCircle + width / 2;
			const edgeY1 = Math.cos(rotation + alpha) * fullCircle + height / 2;
			const edgeX2 = Math.sin(rotation - alpha) * fullCircle + width / 2;
			const edgeY2 = Math.cos(rotation - alpha) * fullCircle + height / 2;

			context.moveTo(startX, startY);
			context.lineTo(edgeX1, edgeY1);
			context.lineTo(edgeX2, edgeY2);

			context.fill();
			context.closePath();
		}
	}, [height, width, frame, progress]);

	return (
		<canvas ref={ref} style={{width, height}} width={width} height={height} />
	);
};
