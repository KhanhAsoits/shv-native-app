import AwesomeAlert from "react-native-awesome-alerts";
import React from "react";

const AlertModal = ({ message, isShow, setIsShow }) => {

  const hideAlert = () => setIsShow(false);
  return (
    <AwesomeAlert
      show={isShow}
      showProgress={false}
      title="Notification"
      message=""
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="No, cancel"
      confirmText="Yes, delete it"
      confirmButtonColor="#DD6B55"
      onCancelPressed={() => {
        hideAlert();
      }}
      onConfirmPressed={() => {
        hideAlert();
      }}
    />
  );
};

export default AlertModal;
