import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function SignIn() {
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
      <Text className="mb-8 text-2xl">Login</Text>
      <View className="w-full gap-2 items-center">
        <Text className="text-left w-80">Email</Text>
        <TextInput
          placeholder="Insira seu email aqui"
          className="w-80 h-10 bg-gray-300 p-2 rounded"
        />

        <Text className="text-left w-80">Senha</Text>
        <TextInput
          secureTextEntry
          placeholder="Insira sua senha aqui"
          className="w-80 h-10 bg-gray-300 p-2 rounded"
        />
      </View>
      <View className="flex-row my-4">
        <Text className="my-4">Esqueceu a senha?</Text>
        <Text className="my-4 mx-2 font-bold underline">Clique aqui</Text>
      </View>
      <Pressable className="bg-teal-300 w-80 h-10 rounded- justify-center items-center">
        <Text className="text-xl font-bold">Entrar</Text>
      </Pressable>
      <View className="flex-row my-4">
        <Text className="my-4">Não possui conta?</Text>
        <Pressable
          onPress={() => {
            router.replace("signUp");
          }}
        >
          <Text className="my-4 mx-2 font-bold underline">criar conta</Text>
        </Pressable>
      </View>
    </View>
  );
}
