import {
  StyleSheet,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ProductDetailScreenProps } from "../../App";
import { Product, useDB } from "../hooks/useDB";
import { AntDesign } from "@expo/vector-icons";

const ProductDetailScreen = ({
  navigation,
  route,
}: ProductDetailScreenProps) => {
  const { id } = route.params;
  const { getProductByID, updateProduct, deleteProduct } = useDB();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    (async () => {
      const result = await getProductByID(parseInt(id));
      setProduct(result);
    })();
  }, [id]);
  const handleSubmit = async () => {
    if (!product) return;
    await updateProduct(product);
    navigation.popToTop();
  };
  const handleDelete = async () => {
    await deleteProduct(parseInt(id));
    navigation.popToTop();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDelete}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View>
      {product && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={product.name}
            onChangeText={(text) => setProduct({ ...product, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="decimal-pad"
            value={product.price === 0 ? "" : product.price.toString()}
            onChangeText={(text) =>
              setProduct({ ...product, price: parseFloat(text) || 0 })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="number-pad"
            value={product.quantity === 0 ? "" : product.quantity.toString()}
            onChangeText={(text) =>
              setProduct({ ...product, quantity: parseInt(text) || 0 })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={product.image}
            onChangeText={(text) => setProduct({ ...product, image: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={product.description}
            onChangeText={(text) =>
              setProduct({ ...product, description: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={product.category}
            onChangeText={(text) => setProduct({ ...product, category: text })}
          />
          <Button title="Update" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginTop: 20,
    gap: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
