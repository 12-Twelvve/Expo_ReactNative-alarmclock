import TrackPlayer, {Capability} from 'react-native-track-player';


await TrackPlayer.setupPlayer()
const track = {
    url: require('./assests/sound.mp3'),
    title: 'Alarm',
    artist: 'deadman',
    duration: 166
};
await TrackPlayer.add([track]);
TrackPlayer.updateOptions({
    capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
});
TrackPlayer.play();


export const useOnTogglePlayback = () => {
      TrackPlayer.play();
};