import React from "react";
import { Pressable, Text, View } from "react-native";
import { userAuth } from "../../context/authContext";

const Home = () => {
  const { logout } = userAuth();

  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;
