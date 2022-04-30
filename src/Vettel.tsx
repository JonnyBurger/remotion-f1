import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Name} from './Name';
import {Num} from './Number';
import {TriangleEntrace} from './TriangleEntrance';
import vettel from './vettel.png';

const Vettel: React.FC<{
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
		<TriangleEntrace showMask progress={progress}>
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

export const DoubleVettel: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const entrance = spring({
		fps,
		frame,
		config: {
			mass: 4,
			damping: 200,
		},
	});

	const constantScale = interpolate(frame, [0, 100], [0, 0.15]);
	const textScale = interpolate(frame, [0, 100], [0, 0.05]);

	const scale = interpolate(entrance, [0, 1], [0.8, 0.9]) + constantScale;

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity: scale}}>
				<Sequence from={15}>
					<AbsoluteFill style={{opacity: 0.4}}>
						<Vettel scaleMultiplier={scale} />
					</AbsoluteFill>
				</Sequence>
				<AbsoluteFill
					style={{
						transform: `scale(${entrance})`,
					}}
				>
					<Num />
				</AbsoluteFill>
				<Sequence from={20}>
					<AbsoluteFill>
						<Vettel scaleMultiplier={scale} />
					</AbsoluteFill>
				</Sequence>
				<AbsoluteFill style={{transform: `scale(${entrance + textScale})`}}>
					<Name />
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
