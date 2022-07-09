import React from 'react';
import {
	AbsoluteFill,
	Sequence,
	staticFile,
	useVideoConfig,
	Video,
} from 'remotion';
import {ASTON_MARTIN} from './colors';
import {Main} from './Main';

export const SideBySide: React.FC = () => {
	const {height, width} = useVideoConfig();
	return (
		<AbsoluteFill>
			<Sequence from={15}>
				<AbsoluteFill style={{width: width / 2, height}}>
					<Main
						{...{
							width: width / 2,
							src: staticFile('vettel.png'),
							color1: ASTON_MARTIN,
							color2: '#6af1e1',
							lastName: 'VETTEL',
							firstName: 'SEBASTIAN',
							numb: '12',
						}}
					/>
				</AbsoluteFill>
			</Sequence>

			<AbsoluteFill
				style={{
					left: width / 2,
				}}
			>
				<Video
					style={{
						width: width / 2,
						height,
					}}
					src={staticFile('original.mp4')}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
