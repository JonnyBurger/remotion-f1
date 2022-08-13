import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {TriangleEntrance} from './TriangleEntrance';

export const Exit: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<TriangleEntrance type="out" progress={interpolate(frame, [0, 30], [0, 1])}>
			<AbsoluteFill style={{backgroundColor: 'white'}} />
		</TriangleEntrance>
	);
};
