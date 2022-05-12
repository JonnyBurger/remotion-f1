import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {AllStrobes} from './AllStrobes';
import {FirstName} from './FirstName';
import {LastName} from './LastName';
import {Num} from './Number';
import {TriangleEntrace} from './TriangleEntrance';
import {Vettel} from './Vettel';

export const Main: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const triangleProgress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const centerZoom = spring({
		fps,
		frame,
		config: {
			mass: 4,
			damping: 200,
		},
	});

	const exit = spring({
		fps,
		frame: frame - 50,
		config: {
			damping: 200,
		},
	});

	const constantScale = interpolate(frame, [0, 100], [0, 0.15]);
	const textScale = interpolate(frame, [0, 100], [0, 0.05]);

	const scale = interpolate(centerZoom, [0, 1], [0.8, 0.9]) + constantScale;

	return (
		<TriangleEntrace type="in" progress={triangleProgress}>
			<AbsoluteFill style={{backgroundColor: 'black'}}>
				<AbsoluteFill>
					<AllStrobes />
				</AbsoluteFill>
				<Sequence from={5}>
					<AbsoluteFill style={{opacity: scale}}>
						<Sequence from={15}>
							<TriangleEntrace type="out" progress={exit}>
								<AbsoluteFill style={{opacity: 0.4}}>
									<Vettel scaleMultiplier={scale} />
								</AbsoluteFill>
							</TriangleEntrace>
						</Sequence>
						<AbsoluteFill
							style={{
								transform: `scale(${centerZoom})`,
							}}
						>
							<Num />
						</AbsoluteFill>
						<Sequence from={20}>
							<TriangleEntrace type="out" progress={exit}>
								<AbsoluteFill>
									<Vettel scaleMultiplier={scale} />
								</AbsoluteFill>
							</TriangleEntrace>
						</Sequence>
						<AbsoluteFill
							style={{transform: `scale(${centerZoom + textScale})`}}
						>
							<FirstName />
						</AbsoluteFill>
						<AbsoluteFill
							style={{transform: `scale(${centerZoom + textScale})`}}
						>
							<LastName />
						</AbsoluteFill>
					</AbsoluteFill>
				</Sequence>
			</AbsoluteFill>
		</TriangleEntrace>
	);
};
