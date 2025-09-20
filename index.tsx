import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SERVER_URL = "https://oabel-classroom-management-server.vercel.app/users";

export default function HandsOnForm() {
  const [firstName, setFirstName] = useState(``);
  const [lastName, setLastName] = useState(``);
  const [section, setSection] = useState(``);
  const [status, setStatus] = useState(``);
  const [message,setMessage] = useState(``);

  const handlePresent = async()=> {
    setMessage("Present");

    try {
      const response = await fetch (SERVER_URL, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          lastName : lastName,
          firstName : firstName,
          section : section,
          status : "Present",
        }),

    });

    if (!response.ok){
      throw new Error ("Server Not Responding ")
    }

    const result = await response .json();
    setMessage("Attendance is Submitted");
    setFirstName("");
    setLastName("");
    setSection("");
  }
    catch(error){
      console.error(`Server Error or Connection Failed.`);

    }
  };
  const handleAbsent = async () =>{
    setMessage("Absent");
  };

  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.phoneContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput 
            style={styles.input} 
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name..."
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput 
            style={styles.input} 
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name..."
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Section:</Text>
          <TextInput 
            style={styles.input} 
            value={section}
            onChangeText={setSection}
            placeholder="Enter section here..."
          />
        </View>
         <Text>{message}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handlePresent} style={styles.button}>
            <Text style={styles.buttonText}>Present</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleAbsent} style={styles.button}>
            <Text style={styles.buttonText}>Absent</Text>
          </TouchableOpacity>
        </View>
        
        {status ? (
          <View style={{marginTop: 20}}>
            <Text style={{color: 'grey', fontSize: 16}}>Name: {firstName} {lastName}</Text>
            <Text style={{color: 'grey', fontSize: 16}}>Section: {section}</Text>
            <Text style={{color: 'grey', fontSize: 16}}>Status: {status}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    backgroundColor: 'grey',
    width: 320,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: '#d85f0eff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
