import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
export default function SignUp() {
  const router = useRouter();
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
          placeholder="Insira seu nome aqui"
          className="w-80 h-10 bg-gray-100 p-2 rounded"
        />

        <Text className="text-left w-80">Email</Text>
        <TextInput
          placeholder="Insira seu email aqui"
          className="w-80 h-10 bg-gray-100 p-2 rounded"
        />

        <Text className="text-left w-80">Senha</Text>
        <TextInput
          secureTextEntry
          placeholder="Insira sua senha aqui"
          className="w-80 h-10 p-2 bg-gray-100 rounded"
        />

        <Text className="text-left w-80">Avatar URL</Text>
        <TextInput
          placeholder="Insira a url da imagem aqui"
          className="w-80 h-10 bg-gray-100 p-2 rounded"
        />
      </View>

      <Pressable className="bg-teal-300 w-80 h-10 mt-8 rounded- justify-center items-center">
        <Text className="text-xl font-bold">Entrar</Text>
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
}
