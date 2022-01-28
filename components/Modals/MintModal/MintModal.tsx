import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { StyleSheet, css } from "aphrodite";
import { useWeb3Context } from "../../../hooks";
import { Styles } from "./Style";
import SelectToken from "../SelectToken/SelectToken";
type PoolProps = {
  isVisible: boolean;
  onClose: () => void;
};
const MintModal = ({ isVisible, onClose }: PoolProps) => {
  const styles = Styles();
  const { address, usdc, usdt } = useWeb3Context();
  const [islaBalance, setIslabalance] = useState(null);
  const [active, setActive] = useState("deposit");
  const [openSelect, setOpenSelect] = useState(false);

  const [selectedToken, setSelectedToken] = useState({
    id: 0,
    name: "",
    image: "",
  });

  const handleSelectOpen = () => {
    setOpenSelect(true);
  };

  const handleSelectClose = () => {
    setOpenSelect(false);
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
        message = message / 10 ** 6;
        console.log(message, "nasdnajsnd");
        // setMessage(message);
      };
      fetchMessage();
    }
  }, [usdt, address]);

  return (
    <>
      <Modal isVisible={isVisible} onClose={onClose}>
        <div className={css(styles.modalHeader)}>
          <div className={css(styles.modalTitle)}>Mint Modal</div>
          <div className={css(styles.modalClose)}>
            {/* <div className={css(styles.modalPercent)}>TBA: 2</div> */}
            <span className={css(styles.close)} onClick={onClose}>
              &times;
            </span>
          </div>
        </div>
        <div>
          <div className={css(styles.mintInputWrapper)}>
            <div className={css(styles.mintTitle)}>
              <span>Available: 0 {selectedToken?.name || ""}</span>
              <span className={css(styles.from)}>From</span>
            </div>
            <div className={css(styles.mintInnerWrap)}>
              <input
                type="text"
                className={css(styles.input)}
                placeholder="0.00"
              />
              <div className={css(styles.maxBtn)}>Max</div>
              {selectedToken?.name ? (
                <div
                  className={css(styles.tokenList)}
                  onClick={handleSelectOpen}
                >
                  <img
                    src={selectedToken?.image}
                    alt=""
                    height="25"
                    width="25"
                  />
                  <span className={css(styles.tokenName)}>
                    {selectedToken?.name}
                  </span>
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="#4ac7d4"
                  >
                    <path
                      d="M0.97168 1L6.20532 6L11.439 1"
                      stroke="#AEAEAE"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div
                  className={css(styles.tokenDefaultList)}
                  onClick={handleSelectOpen}
                >
                  <span className={css(styles.tokenName)}>Select a Token</span>
                </div>
              )}
            </div>
          </div>
          <div className={css(styles.subTitle)}>Max USDC 2k</div>
          <div className={css(styles.subTitle)}>Max USDT 3k</div>

          <div className={css(styles.footer)}>
            <button className={css(styles.densed)}>Mint BANY</button>
          </div>
        </div>
        <SelectToken
          isVisible={openSelect}
          onClose={handleSelectClose}
          setSelectedToken={setSelectedToken}
        />
      </Modal>
    </>
  );
};

export default MintModal;
