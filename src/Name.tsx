import {useState} from 'react';
import {
	continueRender,
	delayRender,
	interpolate,
	interpolateColors,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {useEffect} from 'react';
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FontData, getOpenType} from './type';
import {extendViewbox} from './extend-viewbox';

const TEXT_COLOR = '#ffffff';

export const Name: React.FC = () => {
	const [lastNamePath, setPath] = useState<FontData | null>(null);
	const [firstNamePath, setPath2] = useState<FontData | null>(null);
	const [handle] = useState(() => delayRender());
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const [linearGradientId] = useState(() => random(null) + 'hiya');
	const progress = interpolate(frame, [10, 30], [0, 1]);

	const op1 = interpolate(progress, [0.4, 0.9], [0, 1]);
	const op2 = interpolate(progress, [0.5, 1], [0, 1]);

	useEffect(() => {
		getOpenType(
			'https://jonnyburger.s3.eu-central-1.amazonaws.com/Formula1-Bold.otf',
			'ADEMI',
			{letterSpacing: 0.03}
		)
			.then((p) => {
				setPath(p);
				continueRender(handle);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [handle]);
	useEffect(() => {
		getOpenType(
			'https://jonnyburger.s3.eu-central-1.amazonaws.com/Formula1-Regular.otf',
			'MEHMET',
			{
				letterSpacing: 0.5,
			}
		)
			.then((p) => {
				setPath2(p);
				continueRender(handle);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [handle]);

	return (
		<AbsoluteFill
			style={{
				filter: 'drop-shadow(0 0 20px rgba(0,0,0,1))',
				paddingTop: 450,
			}}
		>
			{firstNamePath ? (
				<svg
					style={{
						height: 34,
					}}
					viewBox={extendViewbox(
						`${firstNamePath.boundingBox.x1} ${firstNamePath.boundingBox.y1} ${
							firstNamePath.boundingBox.x2 - firstNamePath.boundingBox.x1
						} ${firstNamePath.boundingBox.y2 - firstNamePath.boundingBox.y1}`,
						1.2
					)}
				>
					{firstNamePath.chars.map((char, i) => {
						const delay = random(i) * fps * 0.5;
						const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						});
						const color = interpolateColors(
							opacity,
							[0, 1],
							['transparent', TEXT_COLOR]
						);
						return <path key={i} d={char} fill={color} />;
					})}
				</svg>
			) : null}
			<div style={{height: 2}} />
			{lastNamePath ? (
				<svg
					style={{
						height: 100,
					}}
					viewBox={extendViewbox(
						`${lastNamePath.boundingBox.x1} ${lastNamePath.boundingBox.y1} ${
							lastNamePath.boundingBox.x2 - lastNamePath.boundingBox.x1
						} ${lastNamePath.boundingBox.y2 - lastNamePath.boundingBox.y1}`,
						1.2
					)}
					fill={`url(#${linearGradientId})`}
				>
					<defs>
						<linearGradient
							id={linearGradientId}
							stopColor="#fff"
							stopOpacity={1}
							gradientTransform="rotate(45)"
						>
							<stop stopColor="#ededed" stopOpacity={op1} offset="0%" />
							<stop stopColor="#e8e8e8" stopOpacity={op2} offset="150%" />
						</linearGradient>
					</defs>
					{lastNamePath.chars.map((char, i) => {
						const delay = (random(i + 'x') * fps) / 2 + 10;
						const opacity = interpolate(frame, [delay, delay + 2], [0, 1], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						});
						const color = interpolateColors(
							opacity,
							[0, 1],
							['transparent', TEXT_COLOR]
						);
						return (
							<>
								<path
									strokeWidth={0.25}
									stroke={color}
									d={char}
									fill="transparent"
								/>
								{frame === Math.round(delay) ? (
									<path d={char} fill={TEXT_COLOR} style={{opacity: 0.4}} />
								) : null}
							</>
						);
					})}
					<path d={lastNamePath.path} />
				</svg>
			) : null}
		</AbsoluteFill>
	);
};
