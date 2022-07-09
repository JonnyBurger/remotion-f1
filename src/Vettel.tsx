import React from 'react';
import {Img, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {TriangleEntrance} from './TriangleEntrance';

export const Driver: React.FC<{
	scaleMultiplier: number;
	src: string;
	width: number;
}> = ({scaleMultiplier, width, src}) => {
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

	return (
		<TriangleEntrance width={width} type="in" progress={progress}>
			<Img
				style={{
					width: 537,
					height: 683,
					transform: `scale(${1.5 * scaleMultiplier}) translateY(140px)`,
				}}
				src={src}
			/>
		</TriangleEntrance>
	);
};
