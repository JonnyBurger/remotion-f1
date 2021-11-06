import {
	interpolate,
	random,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import React, {useEffect, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender} from 'remotion';
import {extendViewbox} from './extend-viewbox';
import {FontData, getOpenType} from './type';

export const Num: React.FC = () => {
	const frame = useCurrentFrame();
	const [path, setPath] = useState<FontData | null>(null);
	const [handle] = useState(() => delayRender());

	const [linearGradientId] = useState(() => random(null) + 'hi');

	useEffect(() => {
		getOpenType(
			'https://jonnyburger.s3.eu-central-1.amazonaws.com/Formula1-Bold.otf',
			'69'
		)
			.then((p) => {
				setPath(p);
				continueRender(handle);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [handle]);

	const progress = interpolate(frame, [0, 40], [0, 1]);

	const op1 = interpolate(progress, [0, 1], [0, 1]);
	const op2 = interpolate(progress, [0.5, 1], [0, 1]);

	const strokeDashoffset = interpolate(progress, [0, 1], [0, 40]);

	const drawProgress = interpolate(progress, [0.1, 0.5], [100, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
			{path ? (
				<svg
					style={{
						height: 450,
						marginTop: -100,
					}}
					viewBox={extendViewbox(
						`${path.boundingBox.x1} ${path.boundingBox.y1} ${
							path.boundingBox.x2 - path.boundingBox.x1
						} ${path.boundingBox.y2 - path.boundingBox.y1}`,
						1.2
					)}
				>
					<defs>
						<linearGradient
							id={linearGradientId}
							stopColor="#fff"
							stopOpacity={1}
							gradientTransform="rotate(45)"
						>
							<stop stopColor="#d5d5d5" stopOpacity={op1} offset="0%" />
							<stop stopColor="#bdbdbd" stopOpacity={op2} offset="100%" />
						</linearGradient>
					</defs>
					<path
						stroke="rgba(255, 255, 255, 0.6)"
						strokeWidth={0.25}
						d={path.path}
						fill="transparent "
					/>
					<path d={path.path} fill={`url(#${linearGradientId})`} />
					<path
						stroke="rgba(255, 255, 255, 0.4)"
						strokeWidth={0.25}
						fill="transparent"
						d={path.path}
						pathLength="100"
						strokeDasharray="100"
						strokeDashoffset={drawProgress}
					/>
					<path
						stroke="rgba(255, 255, 255, 0.2)"
						strokeWidth={0.25}
						strokeDasharray="30 30"
						fill="transparent"
						strokeDashoffset={strokeDashoffset}
						style={{
							filter: 'blur(0.1px)',
						}}
						d={path.path}
					/>
				</svg>
			) : null}
		</AbsoluteFill>
	);
};
