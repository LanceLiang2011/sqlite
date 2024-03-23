import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProductDetailScreenProps } from "../../App";

const ProductDetailScreen = ({
  navigation,
  route,
}: ProductDetailScreenProps) => {
  const { id } = route.params;
  return (
    <View>
      <Text>ProductDetailScreen</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
