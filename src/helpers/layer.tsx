import React from 'react';
import {
	AbsoluteFill,
	Freeze,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const Layer: React.FC<{
	children: React.ReactNode;
	level: number;
}> = ({children, level}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const spr = spring({
		fps,
		frame: frame - 40 - (8 - level) * 5,
		config: {
			damping: 200,
		},
	});

	const contract = spring({
		fps,
		frame: frame - 170,
		config: {
			damping: 200,
		},
		durationInFrames: 40,
	});

	return (
		<AbsoluteFill
			style={{
				border: '3px solid rgba(255, 255, 255, ' + (0.2 - 0.2 * contract) + ')',
				transform: `rotateY(${70 - contract * 70}deg) scale(0.8) translateZ(-${
					level * ((1 - contract) * 100)
				}px) translateY(${interpolate(spr, [0, 1], [1400, 0])}px) translateX(${
					1200 - contract * 1200
				}px)`,
			}}
		>
			<Freeze frame={32}>{children}</Freeze>
		</AbsoluteFill>
	);
};
