import {useState} from 'react';
import {continueRender, delayRender} from 'remotion';
import {useEffect} from 'react';
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {FontData, getOpenType} from './type';
import {extendViewbox} from './extend-viewbox';

export const Name: React.FC = () => {
	const [path, setPath] = useState<FontData | null>(null);
	const [path2, setPath2] = useState<FontData | null>(null);
	const [handle] = useState(() => delayRender());

	useEffect(() => {
		getOpenType(
			'https://jonnyburger.s3.eu-central-1.amazonaws.com/Formula1-Bold.otf',
			'VETTEL'
		)
			.then((p) => {
				setPath(p);
				continueRender(handle);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [handle]);
	useEffect(() => {
		getOpenType(
			'https://jonnyburger.s3.eu-central-1.amazonaws.com/Formula1-Regular.otf',
			'SEBASTIAN',
			{
				letterSpacing: 0.5,
			}
		)
			.then((p) => {
				setPath2(p);
				continueRender(handle);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [handle]);

	return (
		<AbsoluteFill>
			{path2 ? (
				<svg
					style={{
						height: 40,
					}}
					viewBox={extendViewbox(
						`${path2.boundingBox.x1} ${path2.boundingBox.y1} ${
							path2.boundingBox.x2 - path2.boundingBox.x1
						} ${path2.boundingBox.y2 - path2.boundingBox.y1}`,
						1.2
					)}
				>
					<path d={path2.path} fill="#fff" />
				</svg>
			) : null}
			<div style={{height: 8}} />
			{path ? (
				<svg
					style={{
						height: 100,
					}}
					viewBox={extendViewbox(
						`${path.boundingBox.x1} ${path.boundingBox.y1} ${
							path.boundingBox.x2 - path.boundingBox.x1
						} ${path.boundingBox.y2 - path.boundingBox.y1}`,
						1.2
					)}
				>
					<path d={path.path} fill="#fff" />
				</svg>
			) : null}
		</AbsoluteFill>
	);
};
