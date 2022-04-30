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
	L ${600 + progress * 1280} 0
	L ${progress * 1280 - 100} ${height}
	L 0 ${height}
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
