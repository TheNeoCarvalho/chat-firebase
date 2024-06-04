import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { userAuth } from "../context/authContext";
export default function SignUp() {

  const router = useRouter();
  const { registro } = userAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    if (!nome || !email || !senha || !avatarUrl) {
      Alert.alert("Cadastro", "Todos os campos são obrigatórios!");
    }
    let response = await registro(nome, email, senha, avatarUrl);

    if (!response?.success) {
      Alert.alert("Cadastro", response.msg);
    }
  };

  return (
    <View className="flex-1 justify-center items-center mx-8">
      <Image
        source={{
          uri: "https://img.freepik.com/vetores-premium/chat-logo_45189-30.jpg",
        }}
        width={300}
        height={300}
      />
      <Text className="mb-8 text-2xl">Cadastro</Text>
      <View className="w-full gap-2 items-center">
        <Text className="text-left w-80">Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Insira seu nome aqui"
          className="w-80 h-10 bg-gray-200 p-2 rounded"
        />

        <Text className="text-left w-80">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Insira seu email aqui"
          className="w-80 h-10 bg-gray-200 p-2 rounded"
        />

        <Text className="text-left w-80">Senha</Text>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="Insira sua senha aqui"
          className="w-80 h-10 p-2 bg-gray-200 rounded"
        />

        <Text className="text-left w-80">Avatar URL</Text>
        <TextInput
          value={avatarUrl}
          onChangeText={setAvatarUrl}
          placeholder="Insira a url da imagem aqui"
          className="w-80 h-10 bg-gray-200 p-2 rounded"
        />
      </View>

      <Pressable
        onPress={handleRegistro}
        className="bg-teal-300 w-80 h-10 mt-8 rounded- justify-center items-center"
      >
        <Text className="text-xl font-bold">Cadastrar</Text>
      </Pressable>

      <View className="flex-row my-4">
        <Text className="my-4">Já possui conta?</Text>
        <Pressable
          onPress={() => {
            router.replace("signIn");
          }}
        >
          <Text className="my-4 mx-2 font-bold underline">Fazer Login</Text>
        </Pressable>
      </View>
    </View>
  );
  };
