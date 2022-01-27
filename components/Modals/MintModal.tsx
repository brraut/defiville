import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { StyleSheet, css } from "aphrodite";
import { useWeb3Context } from "../../hooks";

type PoolProps = {
  isVisible: boolean;
  onClose: () => void;
};
const MintModal = ({ isVisible, onClose }: PoolProps) => {
  const styles = Styles();
  const { address, usdc, usdt } = useWeb3Context();
  const [islaBalance, setIslabalance] = useState(null);
  const [active, setActive] = useState("deposit");

  const changeActive = (tabName: string) => {
    setActive(tabName);
  };

  const checkActive = (tabName: string) => {
    return active === tabName ? true : false;
  };

  // const checkContent = (tabName: string) => {
  //   return css(
  //     styles.tabContent,
  //     checkActive(tabName) ? styles.activeContent : null
  //   );
  // };

  const loadCurrentMessage = async () => {
    const message = await usdt.methods.balanceOf(address).call();
    return message;
  };

  useEffect(() => {
    if (usdt && usdt.methods) {
      // islaGauge.methods
      //   .owner()
      //   .send({ from: address, value: 0 })
      //   .then((res) => console.log(res));
      // setIslabalance(balanceOf);
      const fetchMessage = async () => {
        let message = await loadCurrentMessage();
        message = message / (10 ** 6)
        console.log(message, "nasdnajsnd");
        // setMessage(message);
      };
      fetchMessage();
    }
  }, [usdt, address]);

  const checkTab = (tabName: string) => {
    return css(styles.tabItem, checkActive(tabName) ? styles.activeItem : null);
  };
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className={css(styles.modalHeader)}>
        <div className={css(styles.modalTitle)}>Mint Modal</div>
        <div className={css(styles.modalClose)}>
          {/* <div className={css(styles.modalPercent)}>5% APY</div> */}
          <span className={css(styles.close)} onClick={onClose}>
            &times;
          </span>
        </div>
      </div>
      <div>
        <div className={css(styles.title)}>Available: 0 USDC</div>
        <input type="text" className={css(styles.input)} />
        <div className={css(styles.footer)}>
          <button className={css(styles.densed)}>Mint BANY</button>
        </div>
      </div>
    </Modal>
  );
};

export default MintModal;

const Styles = () => {
  return StyleSheet.create({
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
    },
    modalTitle: {
      fontWeight: "bold",
      fontSize: "24px",
    },
    modalClose: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalPercent: {
      color: "#4AC8D4",
      fontWeight: "bold",
      fontSize: "14px",
      marginRight: "15px",
    },
    title: {
      fontWeight: "bold",
      color: "#000",
    },
    subTitle: {
      color: "gray",
      fontSize: "14px",
    },
    input: {
      background: "#F4F4F4",
      border: "none",
      width: "100%",
      // lineHeight: "36px",
      borderRadius: "5px",
      marginTop: "8px",
      marginBottom: "8px",
      padding: "8px 16px",
    },
    close: {
      color: "#7E7E7E",
      fontSize: "34px",
      cursor: "pointer",
      lineHeight: "100%",
      fontWeight: "bold",
      ":hover": {
        color: "#565656",
      },
    },
    tabs: {
      display: "flex",
      justifyContent: "space-between",
      listStyle: "none",
      margin: "25px 0 15px 0",
    },
    tabItem: {
      flex: 1,
      textTransform: "uppercase",
      fontSize: "14px",
      color: "#B6B6B6",
      textAlign: "center",
      fontWeight: "bold",
      cursor: "pointer",
    },
    tabContent: {
      display: "none",
    },

    activeContent: {
      display: "block",
    },
    activeItem: {
      color: "#4AC8D4",
      borderBottom: "2px solid #4AC8D4",
    },
    footer: {
      display: "flex",
      justifyContent: "space-around",
      columnGap: "15px",
      marginTop: "30px",
    },
    densed: {
      background: "#4AC8D4",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "5px",
      flex: "1",
    },
    outlined: {
      border: "1px solid #4AC8D4",
      background: "#fff",
      borderRadius: "5px",
      fontWeight: "bold",
      color: "#4AC8D4",
      flex: "1",
    },
  });
};
