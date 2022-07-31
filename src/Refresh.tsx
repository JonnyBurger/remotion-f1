import type {DrawingProps, SkPaint} from '@shopify/react-native-skia';
import {
	createDrawing,
	FilterMode,
	mix,
	rect,
	Skia,
	TileMode,
} from '@shopify/react-native-skia';
import type {ReactNode} from 'react';

const width = 1280;
const height = 720;

const displacementShader = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform float progress;
uniform float revert;

half4 main(float2 xy) {
  if (xy.y > progress) {
    return image.eval(xy + vec2(revert == 0 ? -30 : 30.0 , 0.0)).rgba;
  }
  return image.eval(xy + vec2(revert == 0 ? 30 : -30.0 , 0.0)).rgba;
}
`)!;

interface RefreshProps {
	children?: ReactNode | ReactNode[];
	progress: number;
	revert: number;
}

const onDraw = createDrawing<RefreshProps>((ctx, {progress, revert}, node) => {
	console.log('ondraw');
	if (node.memoized === null) {
		const recorder = Skia.PictureRecorder();
		const canvas = recorder.beginRecording(rect(0, 0, width, height));
		node.visit({
			...ctx,
			canvas,
		});
		const pic = recorder.finishRecordingAsPicture();
		const shaderPaint = Skia.Paint();
		shaderPaint.setImageFilter(
			Skia.ImageFilter.MakeBlur(3, 3, TileMode.Decal, null)
		);
		shaderPaint.setShader(
			displacementShader.makeShaderWithChildren(
				[mix(progress, 0, height), revert],
				[pic.makeShader(TileMode.Repeat, TileMode.Repeat, FilterMode.Nearest)]
			)
		);
		node.memoized = shaderPaint;
	}
	ctx.canvas.drawPaint(node.memoized as SkPaint);
});

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			skDrawing: DrawingProps<any>;
		}
	}
}

export const Refresh = (props: RefreshProps) => {
	return <skDrawing skipProcessing onDraw={onDraw} {...props} />;
};
