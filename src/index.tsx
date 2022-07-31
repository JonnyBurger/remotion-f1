import {LoadSkia} from '@shopify/react-native-skia/src/web';
import {registerRoot} from 'remotion';

(async () => {
	await LoadSkia();
	const {RemotionVideo} = await import('./Video');
	registerRoot(RemotionVideo);
})();
