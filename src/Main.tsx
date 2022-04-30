import React from 'react';
import {
	AbsoluteFill,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {AllStrobes} from './AllStrobes';
import {TriangleEntrace} from './TriangleEntrance';
import {DoubleVettel} from './Vettel';

export const Main: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const entrance = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	return (
		<TriangleEntrace showMask progress={entrance}>
			<AbsoluteFill style={{backgroundColor: 'black'}}>
				<AbsoluteFill>
					<AllStrobes />
				</AbsoluteFill>
				<Sequence from={5}>
					<DoubleVettel />
				</Sequence>
			</AbsoluteFill>
		</TriangleEntrace>
	);
};
