import {enableSkia} from '@remotion/skia/enable';
import {Config} from '@remotion/cli/config';

Config.setStillImageFormat('png');
Config.setPixelFormat('yuva444p10le');
Config.setCodec('prores');
Config.setProResProfile('4444');

Config.overrideWebpackConfig((config) => enableSkia(config));
Config.setConcurrency(1);
Config.setChromiumOpenGlRenderer('angle');
