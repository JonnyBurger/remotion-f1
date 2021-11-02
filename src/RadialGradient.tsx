import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';

export const RadialGradient: React.FC = () => {
	const {height, width} = useVideoConfig();
	return (
		<AbsoluteFill
			style={{
				height: width,
				width,
				top: -(width - height) / 2,
				backgroundImage:
					'radial-gradient(#6af1e157, #6af1e126 40%, transparent 100%)',
			}}
		/>
	);
};
