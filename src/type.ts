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

export const getOpenType = async (
	url: string,
	text: string,
	options?: opentype.RenderOptions
): Promise<FontData> => {
	const font = await loadFont(url);
	const path = font.getPath(text, 0, 0, 100, options);

	const boundingBox = path.getBoundingBox();
	const svg = path.toPathData(4);

	return {
		boundingBox,
		path: svg,
	};
};
