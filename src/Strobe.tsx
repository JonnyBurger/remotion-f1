import React, {useEffect, useRef} from 'react';
import {
	interpolate,
	random,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';

const positionNoise = new SimplexNoise('position');
const blurNoise = new SimplexNoise('blur');
const opacityNoise = new SimplexNoise('opacity');

export const Strobe: React.FC<{
	type: 'shines' | 'rays' | 'sparks';
	color1: string;
	color2: string;
	width: number;
}> = ({type, width, color1, color2}) => {
	const ref = useRef<HTMLCanvasElement>(null);
	const {height, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
		durationInFrames: 20,
	});

	useEffect(() => {
		const {current} = ref;
		if (!current) {
			return;
		}
		const context = current.getContext('2d') as CanvasRenderingContext2D;
		context.clearRect(0, 0, width, height);
		const lines = type === 'sparks' ? 600 : type === 'shines' ? 10000 : 60;
		for (const direction of ['left', 'right']) {
			for (let i = 0; i < lines; i++) {
				const fullCircle =
					Math.sqrt(width * width + height * height) *
					1.5 *
					interpolate(opacityNoise.noise2D(0, i / 2000), [0, 1], [0.8, 1]) *
					interpolate(random(`progress-${i}`), [0, 1], [0.6, 1.5]) *
					progress;
				const alpha =
					type === 'shines'
						? 0.04
						: interpolate(blurNoise.noise2D(0, i), [-1, 1], [0, 0.005]);
				const color = type === 'shines' ? color1 : 'white';

				const opacityGradient = interpolate(
					i,
					[0, lines / 2, lines],
					[0, 1, 0]
				);

				const alphaRange =
					type === 'rays'
						? [0.3, 0.6]
						: type === 'sparks'
						? [0.5, 0.8]
						: [-0.03, 0.15];

				context.globalAlpha =
					interpolate(opacityNoise.noise2D(0, i / 2000), [-1, 1], alphaRange) *
					opacityGradient;
				context.fillStyle = color;
				context.strokeStyle = color;
				context.beginPath();

				const rotationNoise =
					type === 'shines'
						? 0
						: interpolate(
								positionNoise.noise2D(0, i / 2),
								[-1, 1],
								[-Math.PI * 0.05, Math.PI * 0.05]
						  );

				const finalRadius = type === 'rays' ? 0.5 : 1;

				const spreadRadius = interpolate(progress, [0, 1], [0.6, finalRadius]);

				let rotation =
					interpolate(i, [0, lines], [-spreadRadius, spreadRadius]) +
					Math.PI / 2 +
					rotationNoise;

				if (direction === 'right') {
					rotation += Math.PI;
				}
				rotation -= 0;
				const sparkOffset = Math.max(
					0,
					interpolate(
						random(`random-${i}`),
						[0, 1],
						[-fullCircle * 20, fullCircle]
					) +
						frame * 30
				);
				if (type === 'sparks' && sparkOffset === 0) {
					continue;
				}
				const centerX = width / 2;
				const centerY = height * 0.59;

				const startRadius = type === 'sparks' ? sparkOffset : 0;
				const endRadius = type === 'sparks' ? sparkOffset + 30 : fullCircle;
				const startX = Math.sin(rotation) * startRadius + centerX;
				const startY = Math.cos(rotation) * startRadius + centerY;
				const edgeX1 = Math.sin(rotation + alpha) * endRadius + centerX;
				const edgeY1 = Math.cos(rotation + alpha) * endRadius + centerY;

				const edgeX2 = Math.sin(rotation - alpha) * endRadius + centerX;
				const edgeY2 = Math.cos(rotation - alpha) * endRadius + centerY;

				context.moveTo(startX, startY);
				context.lineTo(edgeX1, edgeY1);
				context.lineTo(edgeX2, edgeY2);
				if (type === 'rays') {
					context.fill();
				} else {
					context.stroke();
				}
				context.closePath();
			}
		}
	}, [height, width, frame, progress, type, color1, color2]);

	return (
		<div>
			<canvas ref={ref} style={{width, height}} width={width} height={height} />
		</div>
	);
};
