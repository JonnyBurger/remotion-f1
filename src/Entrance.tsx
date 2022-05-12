import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {TriangleEntrace} from './TriangleEntrance';

export const Entrance: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<TriangleEntrace type="in" progress={interpolate(frame, [0, 30], [0, 1])}>
			<AbsoluteFill style={{backgroundColor: 'white'}} />
		</TriangleEntrace>
	);
};
