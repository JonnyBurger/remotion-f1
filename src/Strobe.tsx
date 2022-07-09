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

const FULL_DETAILS = false;

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
			mass: 3,
			damping: 200,
		},
		durationInFrames: 10,
	});

	useEffect(() => {
		const {current} = ref;
		if (!current) {
			return;
		}
		const context = current.getContext('2d') as CanvasRenderingContext2D;
		context.clearRect(0, 0, width, height);
		const lines = type === 'sparks' ? 300 : type === 'shines' ? 120 : 40;
		for (const direction of ['left', 'right']) {
			for (let i = 0; i < lines; i++) {
				const fullCircle =
					Math.sqrt(width * width + height * height) *
					(0.5 + interpolate(random(`progress-${i}`), [0, 1], [-0.1, 0.1])) *
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
								[color1, color2]
						  )
						: 'white';
				if (FULL_DETAILS) {
					if (type === 'shines') {
						context.filter = 'blur(5px)';
					} else if (type === 'rays') {
						context.filter = 'blur(2px)';
					} else if (type === 'sparks') {
						context.filter = 'blur(2px)';
					}
				}

				const opacityGradient = interpolate(
					i,
					[0, lines / 2, lines],
					[0, 1, 0]
				);

				const alphaRange =
					type === 'rays'
						? [0.2, 0.8]
						: type === 'sparks'
						? [0.5, 0.8]
						: [0.1, 0.13];

				context.globalAlpha =
					interpolate(opacityNoise.noise2D(0, i / 10), [-1, 1], alphaRange) *
					opacityGradient;
				context.fillStyle = color;
				context.beginPath();
				let rotation =
					interpolate(i, [0, lines], [0, Math.PI * 0.6]) +
					Math.PI * 0.2 +
					interpolate(
						positionNoise.noise2D(0, i / 10),
						[-1, 1],
						[-Math.PI * 0.07, Math.PI * 0.07]
					);

				if (direction === 'right') {
					rotation += Math.PI;
				}
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

				context.fill();
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
