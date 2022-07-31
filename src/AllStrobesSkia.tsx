import {SkiaCanvas} from '@remotion/skia';
import {RadialGradient, Rect, vec} from '@shopify/react-native-skia';
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {StrobeSkia} from './StrobeSkia';

export const AllStrobesSkia: React.FC<{
	color1: string;
	width: number;
}> = ({color1, width}) => {
	const frame = useCurrentFrame();
	const fadeOut = interpolate(frame, [32, 50], [1, 0.4], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});
	const {height} = useVideoConfig();

	return (
		<AbsoluteFill style={{opacity: fadeOut}}>
			<Sequence from={8}>
				<AbsoluteFill>
					<SkiaCanvas height={height} width={width}>
						<Rect x={0} y={0} width={width} height={height} opacity={0.5}>
							<RadialGradient
								c={vec(width / 2, height / 2)}
								r={500}
								colors={[color1, 'transparent']}
							/>
						</Rect>
					</SkiaCanvas>
				</AbsoluteFill>
			</Sequence>
			<Sequence from={8}>
				<AbsoluteFill>
					<StrobeSkia width={width} color1={color1} type="shines" />
				</AbsoluteFill>
				<AbsoluteFill>
					<StrobeSkia width={width} color1={color1} type="rays" />
				</AbsoluteFill>
				<AbsoluteFill>
					<StrobeSkia width={width} color1={color1} type="sparks" />
				</AbsoluteFill>
				<AbsoluteFill>
					<StrobeSkia width={width} color1={color1} type="white-base" />
				</AbsoluteFill>
			</Sequence>
			<Sequence from={8}>
				<AbsoluteFill>
					<SkiaCanvas height={height} width={width}>
						<Rect x={0} y={0} width={width} height={height} opacity={0.1}>
							<RadialGradient
								c={vec(width / 2, height)}
								r={500}
								colors={['white', 'transparent']}
							/>
						</Rect>
					</SkiaCanvas>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};
