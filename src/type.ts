import opentype from 'opentype.js';

export type FontData = {
	boundingBox: opentype.BoundingBox;
	path: string;
};

const loadFont = (url: string): Promise<opentype.Font> => {
	return new Promise((resolve, reject) => {
		opentype.load(url, (err, font) => {
			if (err) {
				reject(err);
			} else {
				resolve(font as opentype.Font);
			}
		});
	});
};

export const getOpenType = async (url: string): Promise<FontData> => {
	const font = await loadFont(url);
	const path = font.getPath('13', 0, 0, 50);

	const boundingBox = path.getBoundingBox();
	const svg = path.toPathData(4);

	return {
		boundingBox,
		path: svg,
	};
};
