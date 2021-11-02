import {Composition} from 'remotion';
import {AllStrobes} from './AllStrobes';
import {RadialGradient} from './RadialGradient';
import {Strobe} from './Strobe';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Strobe"
				component={Strobe}
				durationInFrames={60}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					type: 'shines' as const,
				}}
			/>
			<Composition
				id="Rays"
				component={Strobe}
				durationInFrames={60}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					type: 'shines' as const,
				}}
			/>
			<Composition
				id="AllStrobes"
				component={AllStrobes}
				durationInFrames={60}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					type: 'shines' as const,
				}}
			/>
			<Composition
				id="RadialGradient"
				component={RadialGradient}
				durationInFrames={150}
				height={720}
				width={1280}
				fps={30}
			/>
		</>
	);
};
