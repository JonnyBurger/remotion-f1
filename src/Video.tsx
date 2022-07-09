import {Composition, staticFile} from 'remotion';
import {AllStrobes} from './AllStrobes';
import {ASTON_MARTIN} from './colors';
import {Entrance} from './Entrance';
import {Exit} from './Exit';
import {FirstName} from './FirstName';
import {Main} from './Main';
import {Num} from './Number';
import {RadialGradient} from './RadialGradient';
import {SideBySide} from './SideBySide';
import {Strobe} from './Strobe';
import {Driver} from './Vettel';

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
					width: 1280,
					type: 'shines' as const,
					color1: ASTON_MARTIN,
					color2: '#6af1e1',
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
					width: 1280,

					type: 'shines' as const,
					color1: ASTON_MARTIN,
					color2: '#6af1e1',
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
					width: 1280,

					type: 'sparks' as const,
					color1: ASTON_MARTIN,
					color2: '#6af1e1',
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
					width: 1280,

					color1: ASTON_MARTIN,
					color2: '#6af1e1',
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
				component={Driver}
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
				defaultProps={{
					width: 1280,

					src: staticFile('vettel.png'),
					color1: ASTON_MARTIN,
					color2: '#6af1e1',
					lastName: 'VETTEL',
					firstName: 'SEBASTIAN',
					numb: '12',
				}}
			/>
			<Composition
				id="Luke"
				component={Main}
				durationInFrames={90}
				height={720}
				width={1280}
				fps={30}
				defaultProps={{
					width: 1280,

					src: staticFile('luke.png'),
					color1: '#ff0000',
					color2: '#ff0034',
					firstName: 'LUKE',
					lastName: 'ZIRNGIBL',
					numb: '4',
				}}
			/>
			<Composition
				id="Corey"
				component={Main}
				durationInFrames={90}
				height={720}
				width={1280}
				fps={30}
				defaultProps={{
					width: 1280,

					src: staticFile('corey.png'),
					color1: '#ff0000',
					color2: '#ff0034',
					firstName: 'COREY MAC GREGOR',
					lastName: 'BOTHWELL',
					numb: '42',
				}}
			/>
			<Composition
				id="Num"
				component={Num}
				durationInFrames={90}
				height={720}
				width={1280}
				fps={30}
				defaultProps={{
					numb: '4',
				}}
			/>
			<Composition
				id="Name"
				component={FirstName}
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
			<Composition
				id="SideBySide"
				component={SideBySide}
				durationInFrames={90}
				height={720}
				width={1280 * 2}
				fps={30}
			/>
		</>
	);
};
