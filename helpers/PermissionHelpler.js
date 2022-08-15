import { PermissionsAndroid } from "react-native";

export const AndroidStorage = async () => {

  return await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: "Yêu Cầu Cấp Quyền",
      message: "Ứng Dụng Yêu Cầu Quyền Truy Cập,Đọc,Ghi file",
      buttonPositive: "Cho Phép",
    },
  );
};
