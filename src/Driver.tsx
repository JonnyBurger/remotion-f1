import React from 'react';
import {
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {TriangleEntrance} from './TriangleEntrance';

export const Driver: React.FC<{
	scaleMultiplier: number;
	src: string;
}> = ({scaleMultiplier, src}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const progress = spring({
		frame,
		config: {
			mass: 3,
			damping: 200,
		},
		fps,
	});
	const scaleGrowth = interpolate(frame, [0, 100], [0, 0.4]);

	return (
		<TriangleEntrance type="in" progress={progress}>
			<Img
				style={{
					width: 537,
					height: 683,
					transform: `scale(${
						(1.6 + scaleGrowth) * scaleMultiplier
					}) translateY(140px)`,
				}}
				src={src}
			/>
		</TriangleEntrance>
	);
};
