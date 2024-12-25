import OpenAI from "openai";
import { OPENAI_API_KEY } from '@env';
import {
  // View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  // ActivityIndicator,
  TouchableOpacity,
  // KeyboardAvoidingView,
  Image,
  // Platform,
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  // FlatList,
} from 'react-native';
// import { Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import React, { useState } from 'react';
// import axios from 'axios';


// import openai from "openai";





const Page = () => {
  const { signOut } = useAuth();
  const [name, setName] = useState('');
  const [symptom, setSymptom] = useState('');
  const screenWidth = Dimensions.get('window').width;

  



  const [data, setData] = useState('Ask Your Question! We can help you!');
 
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const formatText = (text:string) => {
    // Format bold text (replace ** with actual styling)
    return text.split("**").map((chunk, index) => {
      if (index % 2 === 1) {
        return <Text key={index} style={[styles.bold, styles.text]}>{chunk}</Text>;
      }
      return <Text key={index} style={styles.text}>{chunk}</Text>;
    });
  };
  const handleSend = async () => {
    console.log("Hello");
    const prompt = `
      You are an OBGYN specialist with over 20 years of experience.The user will either be pregnant or have a partner who is pregnant. 
      They will share how they are feeling, where they are from, how far along they are, 
      and any questions or concerns they might have. Your job is to:
      
      1. Highlight any questions from the user in your response and answer them using your 20 years of OBGYN expertise ONLY.
      2. Highlight all the user information in your response.
      3. Provide detailed advice and tips to the user in your response. 
      User Input:
      Feeling/Comments/Questions/Concerns: ${symptom}
      Name: ${name}
    `;
    console.log("Prompt created:", prompt);
    console.log("API KEY", OPENAI_API_KEY);
    const openai = new OpenAI({apiKey: OPENAI_API_KEY});
    
      
      

    try{
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: `You are an OBGYN specialist with over 20 years of experience.
                   The user will either be pregnant or have a partner who is pregnant. 
      They will share how they are feeling, where they are from, how far along they are, 
      and any questions or concerns they might have. Your job is to:
      
      1. Highlight any questions from the user in your response and answer them using your 20 years of OBGYN expertise ONLY.
      2. Highlight all the user information in your response.
      3. Provide detailed advice and tips to the user in your response. `},
            {
                role: "user",
                content: prompt,
            },
        ],
      });
      console.log(completion.choices[0]?.message?.content);
      const text = completion.choices[0]?.message?.content || "No response received from the AI.";
    //   console.log("chatGPT response", text);
      setData(text);
      console.log("Function Ending", completion.choices[0]?.message?.content);
    } catch (error:any) {
      console.error("Error:", error.message);
      Alert.alert("Error", "Unable to get a response from the server. Please try again.");  
      // console.error("Error during API call:", error.message);
        // Alert.alert("Error", "Could not get a response from OpenAI. Please try again later.");
    }
    
    // try{
    //   console.log("Sending API request");
    //   const response = await axios.post(apiUrl, {
    //     model:'gpt-4',
    //     messages: [{ role: 'user', content: prompt }],
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${apiKey}`,
    //     }
    //   });
    //   console.log("Response received", response);
    //   const text = response.data.choices[0].text || "No response received from the AI.";
    //   console.log("chatGPT response", text);
    //   setData([...data, {type: 'user', 'text': symptom}, {type: 'bot', 'text':text}]);
    // } catch (error:any) {
    //   console.error("Error during API call:", error.message);
    //   Alert.alert("Error", "Could not get a response from OpenAI. Please try again later.");
    // }
    
    

  }
  return (    
    <SafeAreaView style={{flex:1}}>
      <ScrollView contentContainerStyle = {styles.scrollViewContainer}>
        
        <Button title='Sign Me out' onPress={() => signOut()} />
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={[styles.title,{padding: 10}]}>Tell Us About Yourself!</Text>
        <TextInput
                autoCapitalize="none"
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                style={[styles.inputField, {width: screenWidth - 20}]}
        />
        <TextInput
                placeholder="How are you feeling today? Where are you from? How far along are you or your partner? Any Questions or comments or concerns that you might have, I am here to help you with it!!!!"
                value={symptom}
                onChangeText={setSymptom}
                style={[styles.inputField2, {width: screenWidth - 20}]}
                multiline={true}
                textAlignVertical='top'
         />
         <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} onPress={handleSend} >
                             <Text style={styles.btnPrimaryText}>Ask BabyWise AI!</Text>
         </TouchableOpacity>
         {formatText(data)}
      
      </ScrollView>
    </SafeAreaView>
    
    

    
    
    
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: "#34495e",
  },
  bold: {
    fontWeight: "bold",
    color: "#2c3e50",
  },  
  scrollViewContainer: {
      padding: 10, // Adds padding inside the ScrollView
    },
    container: {
      flex: 1,
      // justifyContent: 'center',
      padding: 20,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 20, // Adjust to match the roundness of the image
      overflow: 'hidden',
      alignSelf: 'center',
      
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
      textAlign: 'center',
      
    },
    output: {
      fontSize: 20,
      marginBottom: 20,
      alignSelf: 'center',
    },
    inputField: {
      alignSelf: 'center',
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderColor: Colors.primary,
      borderRadius: 12,
      padding: 10,
      backgroundColor: '#fff',
    },
    inputField2: {
      marginVertical: 4,
      height: 200,
      borderWidth: 1,
      borderColor: Colors.primary,
      borderRadius: 12,
      padding: 10,
      backgroundColor: '#fff',
      alignSelf: 'center',
    },
    btnPrimary: {
      backgroundColor: Colors.primary,
      marginVertical: 4,
    },
    btnPrimaryText: {
      color: '#fff',
      fontSize: 16,
    },
  });


export default Page