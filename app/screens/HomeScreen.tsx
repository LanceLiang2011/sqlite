import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { HomeScreenProps } from "../../App";
import { Product, useDB } from "../hooks/useDB";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { getProducts } = useDB();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const result = await getProducts();
        setProducts(result);
      })();
    }, [])
  );
  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ flexDirection: "row" }}>
      <Text>{item.name}</Text>
      <Text> ${item.price}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {products && products.length > 0 && (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item: Product) => item?.id!.toString()}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
});
