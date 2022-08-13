import React from 'react';
import {AbsoluteFill, interpolate, Sequence} from 'remotion';
import {Layer} from '../helpers/layer';
import {RadialGradient} from './RadialGradient';
import {Strobe} from './Strobe';

export const AllStrobes: React.FC<{
	color1: string;
	width: number;
}> = ({color1, width}) => {
	const frame = 32;
	const fadeOut = interpolate(frame, [32, 50], [1, 0.4], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	return (
		<AbsoluteFill style={{opacity: fadeOut}}>
			<AbsoluteFill
				style={{
					perspective: 2000,
				}}
			>
				<Layer level={8}>
					<AbsoluteFill>
						<RadialGradient width={width} color1={color1} />
					</AbsoluteFill>
				</Layer>
			</AbsoluteFill>

			<Sequence
				from={0}
				style={{
					perspective: 2000,
				}}
			>
				<Layer level={7}>
					<Strobe width={width} color1={color1} type="shines" />
				</Layer>
				<Layer level={6}>
					<Strobe width={width} color1={color1} type="rays" />
				</Layer>
				<Layer level={5}>
					<Strobe width={width} color1={color1} type="sparks" />
				</Layer>
				<Layer level={4}>
					<Strobe width={width} color1={color1} type="white-base" />
				</Layer>
			</Sequence>
		</AbsoluteFill>
	);
};
