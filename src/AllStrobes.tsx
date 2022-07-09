import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {RadialGradient} from './RadialGradient';
import {Strobe} from './Strobe';

export const AllStrobes: React.FC<{
	color1: string;
	color2: string;
	width: number;
}> = ({color1, color2, width}) => {
	const frame = useCurrentFrame();
	const fadeOut = interpolate(frame, [32, 50], [1, 0.4], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	return (
		<AbsoluteFill style={{opacity: fadeOut}}>
			<Sequence from={8}>
				<AbsoluteFill>
					<Strobe width={width} color1={color1} color2={color2} type="shines" />
				</AbsoluteFill>
				<AbsoluteFill>
					<Strobe width={width} color1={color1} color2={color2} type="rays" />
				</AbsoluteFill>
				<AbsoluteFill>
					<Strobe width={width} color1={color1} color2={color2} type="sparks" />
				</AbsoluteFill>
				<AbsoluteFill>
					<Strobe
						width={width}
						color1={color1}
						color2={color2}
						type="white-base"
					/>
				</AbsoluteFill>
			</Sequence>
			<Sequence from={8}>
				<AbsoluteFill>
					<RadialGradient width={width} color1={color1} />
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};
