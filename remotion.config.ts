import {Config} from 'remotion';

Config.Rendering.setImageFormat('jpeg');
Config.Output.setOverwriteOutput(true);

Config.Rendering.setImageFormat('png');
Config.Output.setPixelFormat('yuva444p10le');
Config.Output.setCodec('prores');
Config.Output.setProResProfile('4444');
