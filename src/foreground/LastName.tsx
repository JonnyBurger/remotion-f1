import React, {useEffect, useState} from 'react';
import {
	AbsoluteFill,
	continueRender,
	delayRender,
	interpolate,
	random,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {extendViewbox} from '../helpers/extend-viewbox';
import {FontData, getOpenType} from '../helpers/type';
import {TriangleEntrance} from '../transition/TriangleEntrance';

const TEXT_COLOR = '#ffffff';

export const LastName: React.FC<{
	lastName: string;
}> = ({lastName}) => {
	const [lastNamePath, setPath] = useState<FontData | null>(null);
	const [handle] = useState(() => delayRender());
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const [linearGradientId] = useState(() => random(null) + 'hiya');
	const progress = interpolate(frame, [10, 30], [0, 1]);

	const op1 = interpolate(progress, [0.4, 0.9], [0, 1]);
	const op2 = interpolate(progress, [0.5, 1], [0, 1]);

	useEffect(() => {
		getOpenType(staticFile('bold.otf'), lastName, {letterSpacing: 0.03})
			.then((p) => {
				setPath(p);
				continueRender(handle);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [handle, lastName]);

	const viewBox = lastNamePath
		? extendViewbox(
				`${lastNamePath.boundingBox.x1} ${lastNamePath.boundingBox.y1} ${
					lastNamePath.boundingBox.x2 - lastNamePath.boundingBox.x1
				} ${lastNamePath.boundingBox.y2 - lastNamePath.boundingBox.y1}`,
				1.2
		  )
		: '';

	return (
		<AbsoluteFill
			style={{
				filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))',
				paddingTop: 535,
			}}
		>
			{lastNamePath ? (
				<svg
					style={{
						height: 100,
					}}
					viewBox={viewBox}
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
						const delay = (random(i + 'x') * fps) / 4 + 4;
						return (
							<>
								{frame > Math.round(delay) ? (
									<path
										strokeWidth={1.5}
										stroke="rgba(255, 255, 255, 0.5)"
										d={char}
										fill="transparent"
									/>
								) : null}
								{frame === Math.round(delay) ? (
									<path d={char} fill={TEXT_COLOR} style={{opacity: 0.4}} />
								) : null}
							</>
						);
					})}
				</svg>
			) : null}{' '}
			<TriangleEntrance type="in" progress={progress}>
				<AbsoluteFill
					style={{
						paddingTop: 535,
					}}
				>
					{lastNamePath ? (
						<svg
							style={{
								height: 100,
							}}
							viewBox={viewBox}
						>
							<path strokeWidth={1.5} fill="#eee" d={lastNamePath.path} />
						</svg>
					) : null}
				</AbsoluteFill>
			</TriangleEntrance>
		</AbsoluteFill>
	);
};
