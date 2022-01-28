import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { StyleSheet, css } from "aphrodite";
import { useWeb3Context } from "../../../hooks";
import { Styles } from "./Style";
import { tokens } from "../../../helpers/tokens";
type PoolProps = {
  isVisible: boolean;
  onClose: () => void;
  setSelectedToken: () => any;
};
const SelectToken = ({ isVisible, onClose, setSelectedToken }: PoolProps) => {
  const styles = Styles();
  const handleToken = (token) => {
    setSelectedToken(token);
    onClose();
  };
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className={css(styles.modalHeader)}>
        <div className={css(styles.modalTitle)}>Select a token</div>
        <div className={css(styles.modalClose)}>
          {/* <div className={css(styles.modalPercent)}>5% APY</div> */}
          <span className={css(styles.close)} onClick={onClose}>
            &times;
          </span>
        </div>
      </div>
      <div className={css(styles.listWrapper)}>
        {tokens.map((token) => (
          <div
            className={css(styles.tokenList)}
            key={token.id}
            onClick={() => handleToken(token)}
          >
            <img src={token.image} alt="" height="25" width="25" />
            <span className={css(styles.tokenName)}>{token.name}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SelectToken;
