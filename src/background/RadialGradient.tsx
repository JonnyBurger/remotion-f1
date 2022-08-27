import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const RadialGradient: React.FC<{
	color1: string;
	width: number;
}> = ({color1, width}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();

	const scale = spring({
		fps,
		frame: frame - 2,
		config: {
			mass: 23,
			damping: 200,
		},
		durationInFrames: 10,
	});

	const percent = interpolate(scale, [0, 1], [20, 45]);

	return (
		<AbsoluteFill
			style={{
				height: width,
				width,
				top: -(width - height) / 2,
				backgroundImage: `radial-gradient(${interpolateColors(
					0.6,
					[0, 1],
					['transparent', interpolateColors(0, [0, 1], [color1, 'transparent'])]
				)}, transparent ${percent}%)`,
			}}
		/>
	);
};
