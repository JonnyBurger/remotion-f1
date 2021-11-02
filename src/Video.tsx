import {Composition} from 'remotion';
import {AllStrobes} from './AllStrobes';
import {Main} from './Main';
import {RadialGradient} from './RadialGradient';
import {Strobe} from './Strobe';
import {DoubleVettel} from './Vettel';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Strobe"
				component={Strobe}
				durationInFrames={180}
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
				durationInFrames={180}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					type: 'shines' as const,
				}}
			/>
			<Composition
				id="Sparks"
				component={Strobe}
				durationInFrames={180}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					type: 'sparks' as const,
				}}
			/>
			<Composition
				id="AllStrobes"
				component={AllStrobes}
				durationInFrames={180}
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

			<Composition
				id="Vettel"
				component={DoubleVettel}
				durationInFrames={150}
				height={720}
				width={1280}
				fps={30}
			/>
			<Composition
				id="Main"
				component={Main}
				durationInFrames={90}
				height={720}
				width={1280}
				fps={30}
			/>
		</>
	);
};
