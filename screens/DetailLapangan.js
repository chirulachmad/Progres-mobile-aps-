// DetailLapangan.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DetailLapangan = ({ route, navigation }) => {
  // Menerima data lapangan dari navigasi
  const { lapangan } = route.params;

  // Fungsi untuk menavigasi ke halaman Booking
  const navigateToBooking = () => {
    // Implementasi navigasi ke halaman Booking, Anda bisa menyesuaikan sesuai dengan struktur navigasi Anda
    navigation.navigate("Booking", { lapangan });
  };

  return (
    <View style={styles.container}>
      {/* Tambahkan gambar lapangan dari URL */}
      <Image
        source={require("../assets/field2.jpg")}
        style={styles.gambarLapangan}
      />

      <Text style={styles.namaLapangan}>
        Lapangan Coba2 (Ini masih hardcode)
      </Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="pricetag" size={24} color="black" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>
              Harga Sewa (Ini masih hardcode)
            </Text>
            <Text style={styles.infoText}>Rp. 50.000 / jam</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="football" size={24} color="black" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Fasilitas</Text>
            <Text style={styles.infoText}>
              Kompomnen lapangan Lengkap (Ini masih hardcode){" "}
            </Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="call" size={24} color="black" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Nomor HP</Text>
            <Text style={styles.infoText}>
              {" "}
              082332988513 (Ini masih hardcode)
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.deskripsiLabel}>Deskripsi:</Text>
      <Text style={styles.deskripsiText}>
        Lapangan dengan ukuran 20x100 meter (Ini masih hardcode)
      </Text>

      {/* Tombol Booking */}
      <TouchableOpacity
        style={styles.bookingButton}
        onPress={navigateToBooking}
      >
        <Text style={styles.bookingButtonText}>Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  gambarLapangan: {
    width: "100%",
    height: 200, // Sesuaikan tinggi gambar sesuai kebutuhan
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  namaLapangan: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
  },
  deskripsiLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  deskripsiText: {
    fontSize: 16,
    lineHeight: 22,
  },
  bookingButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  bookingButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailLapangan;
