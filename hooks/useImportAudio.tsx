import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

interface UseImportAudioResult {
  audioFile: DocumentPicker.DocumentPickerResult | null;
  pickAudioFile: () => Promise<void>;
  loading: boolean;
}

const useImportAudio = (): UseImportAudioResult => {
  const [audioFile, setAudioFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickAudioFile = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });
      if (result != null) {
        setAudioFile(result);
      } else {
        console.error("Error picking audio file");
      }
    } catch (err) {
      console.error("Error picking audio file", err);
    } finally {
      setLoading(false);
    }
  };

  return { audioFile, pickAudioFile, loading };
};

export default useImportAudio;
