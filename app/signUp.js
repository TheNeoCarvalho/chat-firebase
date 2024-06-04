import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { userAuth } from "../context/authContext";

export default function SignUp() {
  const router = useRouter();
  const { register } = userAuth();

  // const [nome, setNome] = useState("");
  // const [email, setEmail] = useState("");
  // const [senha, setSenha] = useState("");
  // const [avatarUrl, setAvatarUrl] = useState("");

  const nome = useRef("");
  const email = useRef("");
  const senha = useRef("");
  const avatarUrl = useRef("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !avatarUrl) {
      Alert.alert("Cadastro", "Todos os campos são obrigatórios!");
      return;
    }
    let response = await register(
      nome.current,
      email.current,
      senha.current,
      avatarUrl.current
    );

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
          onChangeText={(text) => (nome.current = text)}
          placeholder="Insira seu nome aqui"
          className="w-80 h-10 bg-gray-300 p-2 rounded"
        />

        <Text className="text-left w-80">Email</Text>
        <TextInput
          onChangeText={(text) => (email.current = text)}
          placeholder="Insira seu email aqui"
          className="w-80 h-10 bg-gray-300 p-2 rounded"
        />

        <Text className="text-left w-80">Senha</Text>
        <TextInput
          onChangeText={(text) => (senha.current = text)}
          secureTextEntry
          placeholder="Insira sua senha aqui"
          className="w-80 h-10 p-2 bg-gray-300 rounded"
        />

        <Text className="text-left w-80">Avatar URL</Text>
        <TextInput
          onChangeText={(text) => (avatarUrl.current = text)}
          placeholder="Insira a url da imagem aqui"
          className="w-80 h-10 bg-gray-300 p-2 rounded"
        />
      </View>

      <Pressable
        onPress={handleRegister}
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
