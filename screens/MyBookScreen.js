import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import HistoryScreen from "./HistoryScreen";
import SaveBookScreen from "./SaveBookScreen";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AndroidStorage } from "../helpers/PermissionHelpler";
import AlertModal from "../components/AlertModal";
import toSlug from "../helpers/StringHelper";
import { AddGlobalConfigBook } from "../helpers/FileHelper";


const MyBookScreen = ({ navigation, appContext }) => {
  const listTabItem = [{ id: 1, title: "Lịch sử", to: "history" }, { id: 2, title: "Đã lưu", to: "saves" }];
  const [activeTab, setActiveTab] = useState(1);
  const [filesPick, setFilesPick] = useState([]);
  const [fileChoseModal, setFileChoseModal] = useState(false);
  const [isAlertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { showSpinner } = useContext(appContext);
  //file get
  const handlePickFile = useCallback(async () => {
    try {
      showSpinner(true);
      let filesPick = await DocumentPicker.pick({
        presentationStyle: "fullscreen",
        allowMultiSelection: false,
      });
      setFilesPick(filesPick);
      showSpinner(false);
    } catch (e) {
      showSpinner(false);
      console.log(e);
    }
  }, []);


  //add book
  const handleOpenAddBookModal = () => {
    setFilesPick([]);
    setFileChoseModal(!fileChoseModal);
  };

  const initBookSaveDir = async () => {
    let grated = await AndroidStorage();
    if (grated === PermissionsAndroid.RESULTS.GRANTED) {
      await RNFS.mkdir(await AsyncStorage.getItem("app_path") + "/books");
      console.log("create book directory success!");
    }
  };

  const handleSaveBook = async () => {
    try {
      //  check permission
      let grated = await AndroidStorage();
      if (grated === PermissionsAndroid.RESULTS.GRANTED) {
        //  create book container folder
        if (filesPick.length > 0) {
          showSpinner(true);
          let book = filesPick[0];
          let bookNameSlug = toSlug(book.name.slice(0, book.name.indexOf(".txt")));
          let bookPath = await AsyncStorage.getItem("app_path") + "books/" + bookNameSlug;
          let filePath = bookPath + "/" + bookNameSlug + ".txt";

          await RNFS.mkdir(bookPath);
          console.log("create book folder success", {
            bookName: book.name.slice(0, book.name.indexOf(".txt")),
            path: bookPath,
          });


          //read file content
          const content = await RNFS.readFile(book.uri);


          //write content to txt file
          if (await RNFS.exists(bookPath)) {
            console.log("book path : ", filePath);

            await RNFS.writeFile(filePath, content, "utf8");

            console.log("Save book content file success!");
            console.log("Save config file");
            let configFilePath = bookPath + "/" + "config.json";
            let configObject = JSON.stringify({
              title: book.name.slice(0, book.name.indexOf(".txt")),
              slug: bookNameSlug,
              file: bookNameSlug + ".txt",
            });

            await RNFS.writeFile(configFilePath, configObject, "utf8");
            console.log("create global config success!");


            await AddGlobalConfigBook(configObject);

            handleOpenAddBookModal();
            //create global config

            //
            showSpinner(false);
          } else {
            console.log("book folder path not exits");
          }
        } else {
          console.log("no book chosen!");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  //modakjn                                   l
  const AddBookModal = () => {
    return (
      <Modal
        visible={fileChoseModal}
        hasBackdrop={false}
        onBackButtonPress={handleOpenAddBookModal}
        avoidKeyboard={true}
      >
        <View style={{ backgroundColor: "white", elevation: 2, padding: 20, borderRadius: 16 }}>
          <Text style={{ color: "gray", fontWeight: "500", fontSize: 16 }}>Book title : </Text>
          <TextInput
            defaultValue={filesPick.length > 0 ? filesPick[0].name.slice(0, filesPick[0].name.indexOf(".txt")) : ""}
            style={{
              height: 40,
              paddingHorizontal: 10,
              marginVertical: 10,
              color: "black",
              backgroundColor: "rgba(0,0,0,0.1)",
              fontSize: 12,
              borderRadius: 8,
            }}></TextInput>

          <Text style={{ color: "gray", fontWeight: "500", fontSize: 16 }}>Book file : </Text>
          <TouchableOpacity onPress={handlePickFile} style={{
            marginVertical: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            overflow: "hidden",
            borderRadius: 8,
            backgroundColor: "rgba(0,0,0,0.1)",
          }}>
            <Text style={{ color: "black" }}>{filesPick.length <= 0 ? "Chose Book File!" : "File Chosen!"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveBook} style={{
            marginVertical: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            backgroundColor: "black",
            borderRadius: 8,
          }}>
            <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={"save-outline"} size={24} color={"white"}></Ionicons>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}> Save Book</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  //end modal
  //end file get
  const TabItem = ({ item }) => {
    return (
      <>
        {activeTab === item.id ?
          <TouchableOpacity style={styles.headerItem} onPress={() => setActiveTab(item.id)}>
            <Text style={{ ...styles.subHeaderText, fontWeight: "500" }}>{item.title}</Text>
            <View style={styles.bottomLine}></View>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.headerItem} onPress={() => setActiveTab(item.id)}>
            <Text style={{ ...styles.subHeaderText, color: "gray" }}>{item.title}</Text>
          </TouchableOpacity>
        }
      </>

    );
  };

  useEffect(() => {
    const asyncBootstrap = async () => {
      await initBookSaveDir();
    };
    asyncBootstrap();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 10 }}>
      <AlertModal isShow={isAlertShow} setIsShow={setAlertShow} message={alertMessage}></AlertModal>
      <View style={{ flex: 1 }}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Tủ Truyện</Text>
          <TouchableOpacity>
            <Ionicons name={"settings-sharp"} size={24} color={"black"}></Ionicons>
          </TouchableOpacity>
        </View>
        {/*tab */}
        <View style={styles.headerTab}>
          {listTabItem.map((item, index) => (<TabItem key={index + item.id} item={item}></TabItem>))}
        </View>
        {/*end tab*/}
      </View>
      <View style={{ flex: 5, backgroundColor: "white" }}>

        {/*scroll view*/}
        <View style={{ flex: 1 }}>
          {activeTab === 1 ? <HistoryScreen appContext={appContext}></HistoryScreen> :
            <SaveBookScreen appContext={appContext}></SaveBookScreen>}
        </View>
        {/*end scroll view*/}
        {/*fix add book buttom*/}
        <TouchableOpacity style={styles.addBtn} onPress={handleOpenAddBookModal}>
          <Ionicons name={"folder"} size={20} color={"black"}></Ionicons>
        </TouchableOpacity>
      </View>
      <AddBookModal></AddBookModal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  addBtn: {
    width: 50,
    height: 50,
    elevation: 2,
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTab: {
    backgroundColor: "white",
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
  },
  subHeaderText: {
    fontWeight: "300",
    marginVertical: 8,
    marginHorizontal: 8,
    color: "black",
    fontSize: 15,
  },
  headerText: {
    color: "black",
    fontSize: 18,
  },
  headerContent: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomLine: {
    width: 50,
    margin: 0,
    borderBottomWidth: 2,
    borderRadius: 16,
    borderBottomColor: "black",
  },
  headerItem: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyBookScreen;
