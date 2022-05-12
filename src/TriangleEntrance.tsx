import React, {useState} from 'react';
import {AbsoluteFill, random, useVideoConfig} from 'remotion';

type TransitionType = 'in' | 'out';

export const TriangleEntrace: React.FC<{
	progress: number;
	children: React.ReactNode;
	type: TransitionType;
}> = ({children, progress, type}) => {
	const {height, width} = useVideoConfig();
	const [clipId] = useState(() => String(random(null)));

	const progressInDirection = type === 'in' ? progress : 1 - progress;

	const pathIn = `
	M 0 0
	L ${progressInDirection * width * 2} 0
	L ${0} ${height * 2 * progressInDirection}
	Z`;

	const pathOut = `
	M ${width} ${height}
	L ${width - 2 * progressInDirection * width} ${height}
	L ${width} ${height - 2 * progressInDirection * height}
	Z
	`;

	const path = type === 'in' ? pathIn : pathOut;

	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					clipPath: `url(#${clipId})`,
				}}
			>
				{children}
			</AbsoluteFill>
			<AbsoluteFill>
				<svg viewBox={`0 0 ${width} ${height}`} width={0} height={0}>
					<defs>
						<clipPath id={clipId}>
							<path d={path} fill="red" />
						</clipPath>
					</defs>
				</svg>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
