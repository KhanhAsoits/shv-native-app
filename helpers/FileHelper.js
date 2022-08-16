import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";

export const AddGlobalConfigBook = async (content) => {
  let globalConfigPath = await AsyncStorage.getItem("app_path") + "/books/books.json";

  if (!await RNFS.exists(globalConfigPath)) {
    await RNFS.writeFile(globalConfigPath, JSON.stringify({}), "utf8");
  }
  let globalConfigContent = await RNFS.readFile(globalConfigPath);
  let globalConfigObject = { ...globalConfigContent, content };
  await RNFS.write(globalConfigPath, JSON.stringify(globalConfigObject), "utf8");
  console.log("save global config success!");
};
