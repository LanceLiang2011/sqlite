import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useDB, type Product } from "../hooks/useDB";
import { NewProductScreenProps } from "../../App";

const INITIAL_STATE = {
  name: "",
  price: 0,
  quantity: 0,
  image: "",
  description: "",
  category: "",
};

const NewProductScreen = ({ navigation }: NewProductScreenProps) => {
  const [product, setProduct] = useState<Product>(INITIAL_STATE);
  const { insertProduct } = useDB();
  const handleSubmit = async () => {
    const result = await insertProduct(product, () =>
      setProduct(INITIAL_STATE)
    );
    console.log(result); // FIXME: DELETE
  };
  return (
    <View style={styles.container}>
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
          onChangeText={(text) => setProduct({ ...product, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={product.category}
          onChangeText={(text) => setProduct({ ...product, category: text })}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default NewProductScreen;

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
