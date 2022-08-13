import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {AllStrobesSkia} from './background/AllStrobesSkia';
import {Driver} from './foreground/Driver';
import {FirstName} from './foreground/FirstName';
import {LastName} from './foreground/LastName';
import {Num} from './foreground/Number';
import {TriangleEntrance} from './transition/TriangleEntrance';

export const Main: React.FC<{
	src: string;
	color1: string;
	firstName: string;
	lastName: string;
	numb: string;
	width: number;
	imageStyle: React.CSSProperties;
}> = ({src, color1, width, numb, firstName, lastName, imageStyle}) => {
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

	const textScale = interpolate(frame, [0, 100], [0, 0.02]);

	return (
		<TriangleEntrance progress={nameExitDelayed} type="out">
			<TriangleEntrance type="in" progress={triangleProgress}>
				<AbsoluteFill>
					<TriangleEntrance type="out" progress={exit}>
						<AbsoluteFill style={{backgroundColor: '#111'}}>
							<AllStrobesSkia width={width} color1={color1} />
						</AbsoluteFill>
					</TriangleEntrance>
					<Sequence from={5}>
						<AbsoluteFill
							style={{
								transform: `scale(${centerZoom})`,
								opacity: 0.8,
							}}
						>
							<Num numb={numb} />
						</AbsoluteFill>
						<TriangleEntrance progress={nameExit} type="out">
							<AbsoluteFill
								style={{
									transform: `scale(${centerZoom})`,
								}}
							>
								<Num numb={numb} />
							</AbsoluteFill>
						</TriangleEntrance>
						<Sequence from={5}>
							<TriangleEntrance type="out" progress={exit}>
								<AbsoluteFill style={{opacity: 0.85}}>
									<Driver
										imageStyle={imageStyle}
										src={src}
										scaleMultiplier={1}
									/>
								</AbsoluteFill>
							</TriangleEntrance>
						</Sequence>
						<Sequence from={10}>
							<TriangleEntrance type="out" progress={exit}>
								<AbsoluteFill>
									<Driver
										imageStyle={imageStyle}
										src={src}
										scaleMultiplier={1}
									/>
								</AbsoluteFill>
							</TriangleEntrance>
						</Sequence>
						<TriangleEntrance progress={exit} type="out">
							<AbsoluteFill
								style={{transform: `scale(${centerZoom + textScale})`}}
							>
								<FirstName firstName={firstName} />
							</AbsoluteFill>
						</TriangleEntrance>
						<AbsoluteFill
							style={{
								transform: `scale(${centerZoom + textScale})`,
								opacity: 0.8,
							}}
						>
							<LastName lastName={lastName} />
						</AbsoluteFill>
						<TriangleEntrance type="out" progress={nameExit}>
							<AbsoluteFill
								style={{transform: `scale(${centerZoom + textScale})`}}
							>
								<LastName lastName={lastName} />
							</AbsoluteFill>
						</TriangleEntrance>
					</Sequence>
				</AbsoluteFill>
			</TriangleEntrance>
		</TriangleEntrance>
	);
};
