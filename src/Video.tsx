import {Composition} from 'remotion';
import {AllStrobes} from './AllStrobes';
import {Entrance} from './Entrance';
import {Exit} from './Exit';
import {Main} from './Main';
import {Name} from './Name';
import {Num} from './Number';
import {RadialGradient} from './RadialGradient';
import {Strobe} from './Strobe';
import {Vettel} from './Vettel';

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
				component={Vettel}
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
			<Composition
				id="Num"
				component={Num}
				durationInFrames={90}
				height={720}
				width={1280}
				fps={30}
			/>
			<Composition
				id="Name"
				component={Name}
				durationInFrames={90}
				height={720}
				width={1280}
				fps={30}
			/>
			<Composition
				id="Entrance"
				component={Entrance}
				durationInFrames={90}
				height={720}
				width={1280}
				fps={30}
			/>
			<Composition
				id="Exit"
				component={Exit}
				durationInFrames={90}
				height={720}
				width={1280}
				fps={30}
			/>
		</>
	);
};
