import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import { Audio } from "expo-av";
import useImportAudio from "@/hooks/useImportAudio";

const AudioPlayer: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioFile, pickAudioFile, loading } = useImportAudio();

  const playAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Replace with your audio URL or local file
      });
      setSound(sound);
      setIsPlaying(true);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing audio", error);
    }
  };

  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  // Cleanup: Unload the sound when the component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View
      style={{ padding: 20, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ marginBottom: 10, fontSize: 18 }}>Expo Audio Player</Text>
      <Button
        title={isPlaying ? "Pause" : "Play"}
        onPress={isPlaying ? pauseAudio : playAudio}
      />
      <View style={{ marginTop: 10 }}>
        <Button title="Stop" onPress={stopAudio} />
      </View>
      <Button title="import Audio" onPress={pickAudioFile} />
    </View>
  );
};

export default AudioPlayer;
