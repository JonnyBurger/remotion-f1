import React from 'react';
import {Img, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {TriangleEntrace} from './TriangleEntrance';
import vettel from './vettel.png';

export const Vettel: React.FC<{
	scaleMultiplier: number;
}> = ({scaleMultiplier}) => {
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
		<TriangleEntrace type="in" progress={progress}>
			<Img
				style={{
					width: 537,
					height: 683,
					transform: `scale(${1.5 * scaleMultiplier}) translateY(140px)`,
				}}
				src={vettel}
			/>
		</TriangleEntrace>
	);
};
