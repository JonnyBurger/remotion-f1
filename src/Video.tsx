import {Composition, Folder, staticFile} from 'remotion';
import {AllStrobes} from './background/AllStrobes';
import {AllStrobesSkia} from './background/AllStrobesSkia';
import {RadialGradient} from './background/RadialGradient';
import {Strobe} from './background/Strobe';
import {Driver} from './foreground/Driver';
import {FirstName} from './foreground/FirstName';
import {LastName} from './foreground/LastName';
import {Num} from './foreground/Number';
import {ASTON_MARTIN} from './helpers/colors';
import {Main} from './Main';
import {Entrance} from './transition/Entrance';
import {Exit} from './transition/Exit';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Folder name="BackgroundElements">
				<Composition
					id="RadialGradient"
					component={RadialGradient}
					durationInFrames={30}
					height={720}
					width={1280}
					fps={30}
					defaultProps={{
						width: 1280,
						color1: 'gray',
					}}
				/>
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
						type: 'rays' as const,
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
					id="WhiteBase"
					component={Strobe}
					durationInFrames={180}
					fps={30}
					width={1280}
					height={720}
					defaultProps={{
						width: 1280,
						type: 'white-base' as const,
						color1: ASTON_MARTIN,
					}}
				/>
			</Folder>
			<Folder name="Background">
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
					id="AllStrobesSkia"
					component={AllStrobesSkia}
					durationInFrames={180}
					fps={30}
					width={1280}
					height={720}
					defaultProps={{
						width: 1280,
						color1: ASTON_MARTIN,
					}}
				/>
			</Folder>
			<Folder name="Foreground">
				<Composition
					id="Driver"
					component={Driver}
					durationInFrames={150}
					height={720}
					width={1280}
					fps={30}
					defaultProps={{
						src: staticFile('jonny.png'),
						imageStyle: {
							width: 400,
							marginTop: -40,
							marginLeft: -40,
							transform: `rotate(-4deg)`,
						},
						scaleMultiplier: 1,
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
					id="FirstName"
					component={FirstName}
					durationInFrames={90}
					height={720}
					width={1280}
					fps={30}
					defaultProps={{
						firstName: 'JONNY',
					}}
				/>
				<Composition
					id="LastName"
					component={LastName}
					durationInFrames={90}
					height={720}
					width={1280}
					fps={30}
					defaultProps={{
						lastName: 'BURGER',
					}}
				/>
			</Folder>
			<Folder name="Transitions">
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
			</Folder>

			<Folder name="Drivers">
				<Composition
					id="Vettel"
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
						numb: '5',
						imageStyle: {
							width: 537,
							height: 683,
						},
					}}
				/>
				<Composition
					id="Matteo"
					component={Main}
					durationInFrames={90}
					height={720}
					width={1280}
					fps={30}
					defaultProps={{
						width: 1280,
						src: staticFile('matteo.png'),
						color1: '#eee',
						firstName: 'MATTEO',
						lastName: 'GAMBA',
						numb: '21',
						imageStyle: {
							width: 425,
							height: 767,
							transform: `scale(0.85)`,
							marginTop: -60,
						},
					}}
				/>
				<Composition
					id="William"
					component={Main}
					durationInFrames={90}
					height={720}
					width={1280}
					fps={30}
					defaultProps={{
						width: 1280,
						src: staticFile('william.png'),
						color1: '#00b4ff',
						firstName: 'WILLIAM',
						lastName: 'CANDILLON',
						numb: '90',
						imageStyle: {
							width: 425,
							height: 767,
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
						color1: '#d4fffe',
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
							transform: `scale(1.3) translateX(30px) translateY(100px)`,
						},
					}}
				/>
				<Composition
					id="Isabell"
					component={Main}
					durationInFrames={90}
					height={720}
					width={1280}
					fps={30}
					defaultProps={{
						width: 1280,
						src: staticFile('isabell.png'),
						color1: '#ff0000',
						firstName: 'Isabell',
						lastName: 'FINK',
						numb: '42',
						imageStyle: {
							width: 547,
							height: 739,
							marginLeft: -100,
						},
					}}
				/>
			</Folder>
		</>
	);
};
