import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import image from "react-native-reanimated/src/reanimated2/component/Image";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Backdrop } from "react-native-backdrop";

const HistoryScreen = ({ navigation, appContext }) => {
  const { handleOpen, setBackDropContent } = useContext(appContext);

  const handleOpenSelectMenu = (item) => {
    const listSelection = [
      { id: 1, title: "Tải truyện", icon: "cloud-download-outline" },
      { id: 2, title: "Xóa khỏi tủ truyện", icon: "trash-outline" },
      { id: 3, title: "Nhận thông báo", icon: "notifications-off" },
    ];
    const backDropContent = (
      <View style={{ paddingHorizontal: 22, paddingVertical: 10, marginVertical: 10, backgroundColor: "white" }}>
        <View
          style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginBottom: 16 }}>
          <Image source={item.image} style={{ width: 50, height: 70, borderRadius: 6 }}></Image>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ color: "black", fontWeight: "500", fontSize: 15 }}>{item.title}</Text>
            <Text style={{ color: "gray", fontWeight: "300", fontSize: 14 }}>Đã
              đọc {item.current + "/" + item.chapters}</Text>
          </View>
        </View>
        {/*list select */}
        <FlatList data={listSelection} renderItem={(item, index) => {
          return (
            <TouchableOpacity>

              <View key={index + item?.id} style={{
                flexDirection: "row",
                backgroundColor: "white",
                justifyContent: "flex-start",
                alignItems: "center",
                marginVertical: 12,
                paddingHorizontal: 4,
              }}>
                <Ionicons name={item.item.icon} size={24} color={"gray"}></Ionicons>
                <Text style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "300",
                  marginHorizontal: 12,
                }}>{item.item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}></FlatList>
      </View>
    );

    setBackDropContent(backDropContent);
    handleOpen();
  };
  const ListBookItem = ({ item }) => {
    return (
      <View>
        <View style={styles.listItem}>
          <Image source={item.image} style={styles.listItemImage}></Image>
          <View style={{
            flex: 1,
            marginHorizontal: 12,
            alignSelf: "flex-start",
            alignItems: "flex-start",
          }}>
            <Text style={{
              color: "black",
              fontSize: 15,
              fontWeight: "500",
            }}>{item.title}</Text>
            <Text style={{
              color: "gray",
              fontSize: 14,
              fontWeight: "300",
            }}>Đã đọc {item.current + "/" + item.chapters}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            handleOpenSelectMenu(item);
          }}>
            <Ionicons name={"ellipsis-horizontal"} style={{ transform: [{ rotate: "90deg" }] }} size={24}
                      color={"gray"}></Ionicons>
          </TouchableOpacity>
        </View>
        {/*selector*/}
      </View>
    );
  };
  const FlatListData = [
    {
      id: 1,
      image: require("../assets/images/tongmangame.jpg"),
      title: "Tổng Mạn : The Gamer",
      chapters: 450,
      current: 20,
    },
    {
      id: 2,
      image: require("../assets/images/thu-nguyen-sieu-viet-gia.jpg"),
      title: "Nhât Kiếp Tiên Phàm",
      chapters: 130,
      current: 60,
    },
    {
      id: 3,
      image: require("../assets/images/than-nguyen-ky.jpg"),
      title: "Toàn Chức Pháp Sư Dị Bản",
      chapters: 1450,
      current: 250,
    },
    {
      id: 4,
      image: require("../assets/images/hung-ca-da-viet.jpg"),
      title: "Hùng Ca Đại Việt",
      chapters: 150,
      current: 10,
    },
    {
      id: 5,
      image: require("../assets/images/van-bien-hon-de.jpg"),
      title: "Vạn Biến Hồn Đế",
      chapters: 440,
      current: 135,
    },
    {
      id: 6,
      image: require("../assets/images/the-gioi-duy-nhat-phap-su.jpg"),
      title: "Thế Giới Duy Nhất Pháp Sư",
      chapters: 233,
      current: 93,
    },
    {
      id: 7,
      image: require("../assets/images/ma-than-thien-quan.jpg"),
      title: "Ma Thần Thiên Quân",
      chapters: 256,
      current: 193,
    },
    {
      id: 8,
      image: require("../assets/images/van-minh-hoang-da.jpg"),
      title: "Văn Minh Hoang Dã",
      chapters: 2332,
      current: 133,
    },
    {
      id: 9,
      image: require("../assets/images/de-nhat-de-quoc.jpg"),
      title: "Đệ Nhất Đế Quốc",
      chapters: 843,
      current: 116,
    },
    {
      id: 10,
      image: require("../assets/images/van-gioi-tai-uong.jpg"),
      title: "Vạn Giới Tai Ương",
      chapters: 188,
      current: 47,
    },

  ];
  return (
    //lat list
    <View style={{ paddingHorizontal: 12, flex: 1 }}>
      <FlatList data={FlatListData} renderItem={(item, index) => {
        return (
          <ListBookItem item={item.item} key={index + item?.id}></ListBookItem>
        );
      }}></FlatList>

    </View>
  );
};
const styles = StyleSheet.create({
  selectorContainer: {},
  scrollContainer: {
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  listItemImage: {
    width: 70,
    height: 95,
    borderRadius: 8,
  },
  listItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
export default HistoryScreen;
