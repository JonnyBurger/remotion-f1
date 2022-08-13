import React, {useEffect, useState} from 'react';
import {
	AbsoluteFill,
	continueRender,
	delayRender,
	interpolate,
	random,
	staticFile,
	useCurrentFrame,
} from 'remotion';
import {extendViewbox} from '../helpers/extend-viewbox';
import {FontData, getOpenType} from '../helpers/type';

export const Num: React.FC<{
	numb: string;
}> = ({numb}) => {
	const frame = useCurrentFrame();
	const [path, setPath] = useState<FontData | null>(null);
	const [handle] = useState(() => delayRender());

	const [linearGradientId] = useState(() => random(null) + 'hi');

	useEffect(() => {
		getOpenType(staticFile('bold.otf'), numb)
			.then((p) => {
				setPath(p);
				continueRender(handle);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [handle, numb]);

	const progress = interpolate(frame, [20, 70], [0.1, 1], {
		extrapolateLeft: 'clamp',
	});

	const op1 = interpolate(progress, [0, 1], [0, 1]);
	const op2 = interpolate(progress, [0.5, 1], [0, 1]);

	const strokeDashoffset = interpolate(progress, [0, 1], [0, 40]);

	const strokeDashOpacity = interpolate(frame, [10, 25, 50], [0, 1, 0]);

	return (
		<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
			{path ? (
				<svg
					style={{
						height: 480,
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
						stroke="rgba(255, 255, 255, 0)"
						strokeWidth={0.25}
						d={path.path}
						fill="transparent "
					/>
					<path d={path.path} fill={`url(#${linearGradientId})`} />
					<path
						stroke="rgba(255, 255, 255, 0.2)"
						strokeWidth={0.25}
						fill="transparent"
						d={path.path}
					/>
					<path
						stroke={`rgba(255, 255, 255, ${strokeDashOpacity})`}
						strokeWidth={0.3}
						strokeDasharray="100 100"
						fill="transparent"
						strokeDashoffset={strokeDashoffset}
						style={{
							filter: 'blur(0.4px)',
						}}
						d={path.path}
					/>
				</svg>
			) : null}
		</AbsoluteFill>
	);
};
