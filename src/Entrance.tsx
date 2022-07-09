import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {TriangleEntrance} from './TriangleEntrance';

export const Entrance: React.FC<{
	width: number;
}> = ({width}) => {
	const frame = useCurrentFrame();

	return (
		<TriangleEntrance
			width={width}
			type="in"
			progress={interpolate(frame, [0, 30], [0, 1])}
		>
			<AbsoluteFill style={{backgroundColor: 'white'}} />
		</TriangleEntrance>
	);
};
