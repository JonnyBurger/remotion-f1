import {SkiaCanvas} from '@remotion/skia';
import {
	BackdropBlur,
	Blur,
	LinearGradient,
	Paint,
	Path,
	Skia,
	SkPath,
	topLeft,
	topRight,
} from '@shopify/react-native-skia';
import {mix} from 'polished';
import React from 'react';
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

type Type = 'shines' | 'rays' | 'sparks' | 'white-base';

const getAmountOfLines = (type: Type): number => {
	if (type === 'sparks') {
		return 600;
	}
	if (type === 'shines') {
		return 10000;
	}
	if (type === 'rays') {
		return 60;
	}
	if (type === 'white-base') {
		return 500;
	}

	throw new Error('');
};

const rotationRandomness = (type: Type, index: number) => {
	if (type === 'shines') {
		return 0;
	}
	if (type === 'white-base') {
		return 0;
	}
	return interpolate(
		positionNoise.noise2D(0, index / 2),
		[-1, 1],
		[-Math.PI * 0.05, Math.PI * 0.05]
	);
};

const getColor = (type: Type, color1: string) => {
	return type === 'shines' ? color1 : 'white';
};

const getRadius = (type: Type) => {
	if (type === 'rays') {
		return 0.6;
	}
	return 1;
};

const getSpreadRadius = (type: Type, progress: number) => {
	if (type === 'white-base') {
		return Math.PI;
	}
	return interpolate(
		progress,
		[0, 1],
		[0.6 * getRadius(type), getRadius(type)]
	);
};

const getRotation = (
	type: Type,
	progress: number,
	index: number,
	direction: string
) => {
	const spreadRadius = getSpreadRadius(type, progress);

	let rotation =
		interpolate(
			index,
			[0, getAmountOfLines(type)],
			[-spreadRadius, spreadRadius]
		) +
		Math.PI / 2 +
		rotationRandomness(type, index);

	if (direction === 'right') {
		rotation += Math.PI;
	} else if (type === 'white-base') {
		rotation += Math.PI * 0.5;
	}

	return rotation;
};

const getAlphaRange = (type: Type): [number, number] => {
	if (type === 'rays') {
		return [0.3, 0.5];
	}
	if (type === 'sparks') {
		return [0.5, 0.8];
	}
	if (type === 'shines') {
		return [-0.03, 0.15];
	}
	if (type === 'white-base') {
		return [0.03, 0.09];
	}

	throw new Error('unknown type');
};

const colors = ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.15)'];

export const getOpacityGradient = (
	type: Type,
	index: number,
	direction: string
) => {
	if (type === 'white-base') {
		if (direction === 'right') {
			return interpolate(
				index,
				[
					0,
					getAmountOfLines(type) * 0.75,
					getAmountOfLines(type) * 0.75 + 0.0000001,
					getAmountOfLines(type),
				],
				[0, 0, 1, 0]
			);
		}
		return interpolate(
			index,
			[0, getAmountOfLines(type) * 0.75, getAmountOfLines(type)],
			[0, 0, 1]
		);
	}
	return interpolate(
		index,
		[0, getAmountOfLines(type) / 2, getAmountOfLines(type)],
		[0, 1, 0]
	);
};

const getOpacityNoise = (
	type: Type,
	index: number,
	alphaRange: [number, number]
) => {
	if (type === 'white-base') {
		return 0.015;
	}
	return interpolate(
		opacityNoise.noise2D(0, index / 2000),
		[-1, 1],
		alphaRange
	);
};

const getOpacity = (type: Type, index: number, direction: string) => {
	const opacityGradient = getOpacityGradient(type, index, direction);

	const alphaRange = getAlphaRange(type);
	return getOpacityNoise(type, index, alphaRange) * opacityGradient;
};

export const StrobeSkia: React.FC<{
	type: Type;
	color1: string;
	width: number;
}> = ({color1, type, width}) => {
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

	const lines = getAmountOfLines(type);

	return (
		<SkiaCanvas width={width} height={height}>
			<BackdropBlur blur={type === 'rays' ? 20 : 0}>
				{['left', 'right'].map((direction) => {
					return (
						<>
							{new Array(lines).fill(true).map((_, i) => {
								const fullCircle =
									Math.sqrt(width * width + height * height) *
									1.5 *
									interpolate(
										opacityNoise.noise2D(0, i / 200),
										[0, 1],
										[0.8, 1]
									) *
									interpolate(random(`progress-${i}`), [0, 1], [0.6, 1.5]) *
									progress;
								const alpha =
									type === 'white-base'
										? 0
										: type === 'shines'
										? 0.04
										: interpolate(blurNoise.noise2D(0, i), [-1, 1], [0, 0.005]);
								const color = getColor(type, color1);

								const rotation = getRotation(type, progress, i, direction);

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
									return null;
								}

								const centerX = width / 2;
								const centerY = height * 0.59;

								const startRadius = type === 'sparks' ? sparkOffset : 0;
								const endRadius =
									type === 'sparks' ? sparkOffset + 30 : fullCircle;
								const startX = Math.sin(rotation) * startRadius + centerX;
								const startY = Math.cos(rotation) * startRadius + centerY;
								const edgeX1 = Math.sin(rotation + alpha) * endRadius + centerX;
								const edgeY1 = Math.cos(rotation + alpha) * endRadius + centerY;

								const edgeX2 = Math.sin(rotation - alpha) * endRadius + centerX;
								const edgeY2 = Math.cos(rotation - alpha) * endRadius + centerY;
								if (type === 'rays') {
									const path = Skia.Path.MakeFromSVGString(
										`M ${startX} ${startY} L ${edgeX1} ${edgeY1} L ${edgeX2} ${edgeY2} z`
									) as SkPath;
									const bounds = path.computeTightBounds();

									return (
										<Path
											color={mix(0.3, color1, 'white')}
											path={path}
											opacity={getOpacity(type, i, direction)}
										>
											<Paint style="fill">
												<LinearGradient
													colors={colors}
													start={topLeft(bounds)}
													end={topRight(bounds)}
												/>
												<Blur blur={10} />
											</Paint>
										</Path>
									);
								}

								return (
									<Path
										path={`M ${startX} ${startY} L ${edgeX1} ${edgeY1}`}
										color={color}
										style="stroke"
										opacity={getOpacity(type, i, direction)}
									/>
								);
							})}
						</>
					);
				})}
			</BackdropBlur>
		</SkiaCanvas>
	);
};
