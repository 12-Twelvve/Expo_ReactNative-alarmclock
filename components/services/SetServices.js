import TrackPlayer, {Capability} from 'react-native-track-player';
import {RepeatMode} from 'react-native-track-player';

export const SetupService = async()=> {
  let isSetup = false;
  try {
    // this method will only reject if player has not been setup yet
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
};

const track = {
    url: require('./../assests/sound.mp3'),
    title: 'Alarm',
    artist: 'deadman',
    duration: 28
    };
export const QueueInitalTracksService = async ()=> {
  await TrackPlayer.add([ track ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};