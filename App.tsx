import React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { Image } from "expo-image";
import { useForm, Controller } from "react-hook-form";
import Dropdown from "react-native-input-select";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  gender: GenderEnum;
  text: string;
}

export default function App() {
  const { control, handleSubmit } = useForm<IFormInput>({});

  const token = "20587|WDWryjerU6vz2BMaJflNudi1L4R0nT6v";
  const [label, setLabel] = React.useState("0");
  const [type, setType] = React.useState("code39");
  const [text, setText] = useState("");
  const [barcode, setBarcode] = React.useState("");

  const handleBuscar = (data: IFormInput) => {
    setBarcode(
      `https://api.invertexto.com/v1/barcode?token=${token}&text=${text}&type=${type}&font=${label}`
    );
  };

  https: return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.text}>Digite o Código:</Text>

      <Controller
        control={control}
        name="text"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ width: "85%" }}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              onBlur={onBlur}
              value={value}
              placeholder="Código"
              placeholderTextColor={"#000"}
            />
            <Dropdown
              label="Tipo"
              labelStyle={{ fontSize: 18, fontWeight: "bold" }}
              placeholder="Selecione o tipo de código..."
              options={[
                { label: "CODE 39", value: "code39" },
                { label: "CODE 128", value: "code128" },
                { label: "EAN 13", value: "ean13" },
              ]}
              selectedValue={type}
              onValueChange={(value) => setType(`${value}`)}
              primaryColor={"green"}
            />

            <Dropdown
              label="Label"
              labelStyle={{ fontSize: 18, fontWeight: "bold" }}
              placeholder="Selecione uma opção"
              options={[
                { label: "Não", value: "0" },
                { label: "Sim", value: "arial" },
              ]}
              selectedValue={label}
              onValueChange={(value) => setLabel(`${value}`)}
              primaryColor={"green"}
            />
          </View>
        )}
      />

      <Button title="Gerar" onPress={handleSubmit(handleBuscar)} />
      <Image
        style={styles.image}
        source={barcode}
        contentFit="fill"
        transition={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 7,
    padding: 20,
    color: "#000",
  },

  image: {
    height: 100,
    width: "90%",
    backgroundColor: "#a1a1a1",
    marginTop: 60,
  },
});
