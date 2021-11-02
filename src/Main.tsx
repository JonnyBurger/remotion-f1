import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {AllStrobes} from './AllStrobes';
import {DoubleVettel} from './Vettel';

export const Main: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<AbsoluteFill>
				<AllStrobes />
			</AbsoluteFill>
			<Sequence from={5}>
				<DoubleVettel />
			</Sequence>
		</AbsoluteFill>
	);
};
