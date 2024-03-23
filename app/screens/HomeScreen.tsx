import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HomeScreenProps } from "../../App";
import { useDB } from "../hooks/useDB";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useDB();
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
