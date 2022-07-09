import React, {useEffect, useState} from 'react';
import {
	AbsoluteFill,
	continueRender,
	delayRender,
	interpolate,
	interpolateColors,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {extendViewbox} from './extend-viewbox';
import {FontData, getOpenType} from './type';

const TEXT_COLOR = '#ffffff';

export const FirstName: React.FC<{
	firstName: string;
}> = ({firstName}) => {
	const [firstNamePath, setPath2] = useState<FontData | null>(null);
	const [handle] = useState(() => delayRender());
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	useEffect(() => {
		getOpenType(
			'https://jonnyburger.s3.eu-central-1.amazonaws.com/Formula1-Regular.otf',
			firstName,
			{
				letterSpacing: 0.3,
			}
		)
			.then((p) => {
				setPath2(p);
				continueRender(handle);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [firstName, handle]);

	return (
		<AbsoluteFill
			style={{
				filter: 'drop-shadow(0 0 20px rgba(0,0,0,1))',
				paddingTop: 460,
			}}
		>
			{firstNamePath ? (
				<svg
					style={{
						height: 42,
					}}
					viewBox={extendViewbox(
						`${firstNamePath.boundingBox.x1} ${firstNamePath.boundingBox.y1} ${
							firstNamePath.boundingBox.x2 - firstNamePath.boundingBox.x1
						} ${firstNamePath.boundingBox.y2 - firstNamePath.boundingBox.y1}`,
						1.2
					)}
				>
					{firstNamePath.chars.map((char, i) => {
						const delay = random(i) * fps * 0.3;
						const opacity = interpolate(frame, [delay, delay + 2], [0, 1], {
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
		</AbsoluteFill>
	);
};
