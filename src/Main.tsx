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
import {TriangleEntrance} from './TriangleEntrance';
import {Driver} from './Vettel';

export const Main: React.FC<{
	src: string;
	color1: string;
	color2: string;
	firstName: string;
	lastName: string;
	numb: string;
	width: number;
}> = ({src, color1, width, numb, color2, firstName, lastName}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const triangleProgress = spring({
		fps,
		frame,
		config: {
			mass: 0.4,
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

	const nameExit = spring({
		fps,
		frame: frame - 55,
		config: {
			damping: 200,
		},
	});

	const nameExitDelayed = spring({
		fps,
		frame: frame - 56.5,
		config: {
			damping: 200,
		},
	});

	const constantScale = interpolate(frame, [0, 100], [0, 0.15]);
	const textScale = interpolate(frame, [0, 100], [0, 0.05]);

	const scale = interpolate(centerZoom, [0, 1], [0.8, 0.9]) + constantScale;

	return (
		<TriangleEntrance progress={nameExitDelayed} type="out" width={width}>
			<TriangleEntrance width={width} type="in" progress={triangleProgress}>
				<AbsoluteFill>
					<TriangleEntrance width={width} type="out" progress={exit}>
						<AbsoluteFill style={{backgroundColor: '#111'}}>
							<AllStrobes width={width} color1={color1} color2={color2} />
						</AbsoluteFill>
					</TriangleEntrance>
					<Sequence from={5}>
						<AbsoluteFill style={{opacity: scale}}>
							<Sequence from={5}>
								<TriangleEntrance width={width} type="out" progress={exit}>
									<AbsoluteFill style={{opacity: 0.6}}>
										<Driver width={width} src={src} scaleMultiplier={scale} />
									</AbsoluteFill>
								</TriangleEntrance>
							</Sequence>
							<AbsoluteFill
								style={{
									transform: `scale(${centerZoom})`,
									opacity: 0.8,
								}}
							>
								<Num numb={numb} />
							</AbsoluteFill>
							<TriangleEntrance progress={nameExit} type="out" width={width}>
								<AbsoluteFill
									style={{
										transform: `scale(${centerZoom})`,
									}}
								>
									<Num numb={numb} />
								</AbsoluteFill>
							</TriangleEntrance>
							<TriangleEntrance progress={nameExit} type="out" width={width}>
								<AbsoluteFill
									style={{
										transform: `scale(${centerZoom})`,
									}}
								>
									<Num numb={numb} />
								</AbsoluteFill>
							</TriangleEntrance>
							<Sequence from={10}>
								<TriangleEntrance width={width} type="out" progress={exit}>
									<AbsoluteFill>
										<Driver width={width} src={src} scaleMultiplier={scale} />
									</AbsoluteFill>
								</TriangleEntrance>
							</Sequence>
							<TriangleEntrance width={width} progress={exit} type="out">
								<AbsoluteFill
									style={{transform: `scale(${centerZoom + textScale})`}}
								>
									<FirstName firstName={firstName} />
								</AbsoluteFill>
							</TriangleEntrance>
							<TriangleEntrance type="out" width={width} progress={nameExit}>
								<AbsoluteFill
									style={{transform: `scale(${centerZoom + textScale})`}}
								>
									<LastName lastName={lastName} />
								</AbsoluteFill>
							</TriangleEntrance>
						</AbsoluteFill>
					</Sequence>
				</AbsoluteFill>
			</TriangleEntrance>
		</TriangleEntrance>
	);
};
