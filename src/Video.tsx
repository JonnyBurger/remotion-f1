import {Composition, staticFile} from 'remotion';
import {AllStrobes} from './AllStrobes';
import {ASTON_MARTIN} from './colors';
import {Driver} from './Driver';
import {Entrance} from './Entrance';
import {Exit} from './Exit';
import {FirstName} from './FirstName';
import {Main} from './Main';
import {Num} from './Number';
import {RadialGradient} from './RadialGradient';
import {SideBySide} from './SideBySide';
import {Strobe} from './Strobe';

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
					lastName: 'VETTEL',
					firstName: 'SEBASTIAN',
					numb: '12',
					imageStyle: {
						width: 537,
						height: 683,
					},
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
					firstName: 'LUKE',
					lastName: 'ZIRNGIBL',
					numb: '4',
					imageStyle: {
						width: 537,
						height: 683,
					},
				}}
			/>
			<Composition
				id="Jonny"
				component={Main}
				durationInFrames={90}
				height={720}
				width={1280}
				fps={30}
				defaultProps={{
					width: 1280,
					src: staticFile('jonny.png'),
					color1: '#55c8ff',
					firstName: 'JONNY',
					lastName: 'BURGER',
					numb: '13',
					imageStyle: {
						width: 400,
						marginTop: -40,
						marginLeft: -40,
						transform: `rotate(-4deg)`,
					},
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
					firstName: 'COREY MAC GREGOR',
					lastName: 'BOTHWELL',
					numb: '42',
					imageStyle: {
						width: 537,
						height: 683,
					},
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
