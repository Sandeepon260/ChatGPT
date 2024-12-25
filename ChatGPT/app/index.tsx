import AnimatedIntro from "@/components/AnimatedIntro";
import BottomLoginSheet from "@/components/BottomLoginSheet";
import { Text, View , StyleSheet, Image} from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,     
      }}
    >
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />   
          
      
      <Text style={styles.title}>BabyWise AI</Text>
      <BottomLoginSheet />
    </View>
  );
}

const styles = StyleSheet.create({
    
    logo: {
      width: 80,
      height: 80,
      borderRadius: 20, // Adjust to match the roundness of the image
      overflow: 'hidden',
      alignSelf: 'center',
      marginVertical: 150,
      marginBottom:25,
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
    },
  });
