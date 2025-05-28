import { StatusBar } from "expo-status-bar";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StyleSheet, Text, View } from "react-native";
import { Button, ButtonText } from "./components/ui/button";

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <View className="flex-1 items-center justify-center">
        <Text className="text-purple-400 text-2xl font-bold">HELLO!</Text>
        <Button>
          <ButtonText>Click</ButtonText>
        </Button>
        <StatusBar style="auto" />
      </View>
    </GluestackUIProvider>
  );
}
