import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RadialGradient} from './RadialGradient';
import {Strobe} from './Strobe';

export const AllStrobes: React.FC = () => {
	return (
		<AbsoluteFill>
			<AbsoluteFill>
				<Strobe type="shines" />
			</AbsoluteFill>
			<AbsoluteFill>
				<Strobe type="rays" />
			</AbsoluteFill>
			<AbsoluteFill>
				<Strobe type="sparks" />
			</AbsoluteFill>
			<AbsoluteFill>
				<RadialGradient />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
