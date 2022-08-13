import React from 'react';
import {
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {TriangleEntrance} from '../transition/TriangleEntrance';

export const Driver: React.FC<{
	scaleMultiplier: number;
	src: string;
	imageStyle: React.CSSProperties;
}> = ({scaleMultiplier, src, imageStyle}) => {
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
			<div
				style={{
					transform: `scale(${
						(1.6 + scaleGrowth) * scaleMultiplier
					}) translateY(140px)`,
				}}
			>
				<Img style={imageStyle} src={src} />
			</div>
		</TriangleEntrance>
	);
};
