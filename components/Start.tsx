import { ImageBackground, Text } from 'react-native';
import startImg from "./../assets/start.jpg";
import { StartImg } from '../styles/';

export default function Start() {
  return (
    <ImageBackground source={startImg} style={StartImg.startImg} resizeMode="cover" testID="background-image">
      <Text style={StartImg.textOverImg}>Få koll på läget i tågtrafiken</Text>
    </ImageBackground>
  );
}
