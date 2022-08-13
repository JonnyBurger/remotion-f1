import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useVideoConfig,
} from 'remotion';
import {AllStrobes} from './background/AllStrobes';
import {Driver} from './foreground/Driver';
import {FirstName} from './foreground/FirstName';
import {LastName} from './foreground/LastName';
import {Num} from './foreground/Number';
import {Layer} from './helpers/layer';
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
	const frame = 32;
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
		<AbsoluteFill style={{}}>
			<AbsoluteFill>
				<TriangleEntrance type="out" progress={exit}>
					<AbsoluteFill style={{backgroundColor: '#111'}}>
						<AllStrobes width={width} color1={color1} />
					</AbsoluteFill>
				</TriangleEntrance>
				<Sequence
					from={0}
					style={{
						perspective: 2000,
						perspectiveOrigin: 'center center',
					}}
				>
					<Layer level={3}>
						<AbsoluteFill
							style={{
								transform: `scale(${centerZoom})`,
								opacity: 0.8,
							}}
						>
							<Num numb={numb} />
						</AbsoluteFill>
					</Layer>
					<Layer level={2}>
						<TriangleEntrance type="out" progress={exit}>
							<AbsoluteFill>
								<Driver imageStyle={imageStyle} src={src} scaleMultiplier={1} />
							</AbsoluteFill>
						</TriangleEntrance>
					</Layer>

					<Layer level={1}>
						<TriangleEntrance progress={exit} type="out">
							<AbsoluteFill
								style={{transform: `scale(${centerZoom + textScale})`}}
							>
								<FirstName firstName={firstName} />
							</AbsoluteFill>
						</TriangleEntrance>
					</Layer>
					<Layer level={0}>
						<TriangleEntrance type="out" progress={nameExit}>
							<AbsoluteFill
								style={{transform: `scale(${centerZoom + textScale})`}}
							>
								<LastName lastName={lastName} />
							</AbsoluteFill>
						</TriangleEntrance>
					</Layer>
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
