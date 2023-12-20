import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const handleSend = () => {
    if (newMessage.trim() !== "") {
      // Menambahkan pesan pengguna ke daftar pesan
      setMessages([...messages, { text: newMessage, id: messages.length }]);
      // Mengosongkan input
      setNewMessage("");
      // Menambahkan pesan balasan otomatis (contoh sederhana)
      setTimeout(() => {
        const replyMessage =
          "Terima kasih! Kami akan segera membalas pesan Anda!";
        setMessages([...messages, { text: replyMessage, id: messages.length }]);
      }, 5000); // Menambahkan pesan balasan setelah 1 detik
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ada yang bisa dibantu?"
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title="KIRIM" onPress={handleSend} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  messageContainer: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  messageText: {
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    padding: 8,
  },
});
export default Chat;
