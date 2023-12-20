import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Home() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch news from the API
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?country=id&apikey=pub_3508168d72ca277a58b779c3cd47bc942ce91"
        );
        const data = await response.json();
        setNewsData(data.results || []); // Use results array if available, otherwise provide an empty array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Dummy data for recommended fields
  const recommendedFields = [
    {
      id: 1,
      name: "Lapangan A",
      image: require("../assets/field1.jpg"),
    },
    {
      id: 2,
      name: "Lapangan B",
      image: require("../assets/field2.jpg"),
    },
    // Add more fields as needed
  ];

  const handleNewsPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={{ padding: 20 }}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => {
            // Handle the logic for ordering the field
          }}
        >
          <Text style={styles.orderButtonText}>Order Lapangan</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>
          Rekomendasi Lapangan
        </Text>

        <View style={styles.fieldContainer}>
          {recommendedFields.map((field) => (
            <TouchableOpacity
              key={field.id}
              style={styles.fieldItem}
              onPress={() => {
                // Handle navigation to the field details or any other action
              }}
            >
              <Image
                source={field.image}
                style={styles.fieldImage}
              />
              <Text style={styles.fieldName}>{field.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.headerText}>
          What's New
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : (
          <ScrollView>
            {newsData.map((article) => (
              <TouchableOpacity
                key={article.article_id}
                style={{ marginBottom: 15 }}
                onPress={() => handleNewsPress(article.link)}
              >
                {/* Use the article.image_url if available, otherwise provide a placeholder image */}
                <Image
                  source={{ uri: article.image_url || 'https://via.placeholder.com/150' }}
                  style={{ width: "100%", height: 200, borderRadius: 8 }}
                />
                <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
                  {article.title}
                </Text>
                <Text style={{ marginTop: 5, fontSize: 14, color: "#555" }}>
                  {article.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldItem: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  fieldImage: {
    width: "100%",
    height: 150,
  },
  fieldName: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});