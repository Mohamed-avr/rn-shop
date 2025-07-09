import { useState } from "react";
import { View, Text, Platform, StyleSheet, Image } from "react-native";

export default function PhoneWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [PhoneWrapper, setPhoneWrapper] = useState(true);
  const [StatusBar, setStatusBar] = useState(true);
  const [frontCamera, setFrontCamera] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      {/* <View
        style={{
          flex: 1,
          position: "relative",
          width: "100%",
          paddingHorizontal: 35,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: 70,
            backgroundColor: "#222",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.84,
            elevation: 10,
            borderColor: "#333",
            borderWidth: 2,

            zIndex: 10,
          }}
        >
          <Image
            source={require("../../assets/logoExpo.png")}
            style={{ width: 26, height: 26 }}
            resizeMode="contain"
          />
        </View>
      </View> */}
      <View style={styles.containerWrapper}>
        {/* <View style={styles.btnOff}></View> */}
        <View
          style={{
            width: "100%",
            height: "100%",
            borderRadius: Platform.OS === "web" ? 60 : 0,
            overflow: "hidden",
            borderColor: "#010103",
            borderWidth: Platform.OS === "web" ? 6 : 0,
          }}
        >
          {Platform.OS === "web" && (
            // <View style={styles.StatusBar}>

            // </View>

            <View style={styles.CameraView}>
              <View style={styles.camera}> </View>
            </View>
          )}

          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    width: Platform.OS === "web" ? 393 : "100%",
    height: Platform.OS === "web" ? 852 : "100%",
    borderRadius: Platform.OS === "web" ? 65 : 0,
    borderWidth: Platform.OS === "web" ? 3 : 0,
    borderColor: Platform.OS === "web" ? "#294B4A" : "transparent",
    backgroundColor: Platform.OS === "web" ? "#668789" : "transparent",
    margin: "auto",
    padding: 3,
    zIndex: 10,
  },
  btnOff: {
    position: "absolute",
    top: 200,
    left: -5,
    width: 30,
    height: 60,
    borderRadius: 8,
    borderWidth: Platform.OS === "web" ? 3 : 0,
    borderColor: Platform.OS === "web" ? "#294B4A" : "transparent",
    backgroundColor: Platform.OS === "web" ? "#668789" : "transparent",
    zIndex: -100,
  },
  StatusBar: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },
  CameraView: {
    width: "100%",
    height: 50,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: 130,
    height: 32,
    borderRadius: 50,
    marginTop: 8,
    backgroundColor: "#000",
  },
});
