import {AbsoluteFill} from 'remotion';
import React, {useState} from 'react';
import {random, useVideoConfig} from 'remotion';

export const TriangleEntrace: React.FC<{
	progress: number;
	children: React.ReactNode;
	showMask: boolean;
}> = ({children, progress, showMask}) => {
	const {height, width} = useVideoConfig();
	const path = `
	M 0 0
	L ${progress * 2 * width} 0
	L ${0} ${height * progress * 2}
	Z`;
	const [clipId] = useState(() => String(random(null)));

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
			{showMask ? (
				<AbsoluteFill>
					<svg viewBox={`0 0 ${width} ${height}`}>
						<path d={path} fill="red" />
					</svg>
				</AbsoluteFill>
			) : null}
		</AbsoluteFill>
	);
};
