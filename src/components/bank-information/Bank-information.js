import React, { useState } from "react";
import BlockHeader from "../../components/block-header";
import CompletedSetup from "./completed-setup/Completed-setup";
import CompletedSteper from "./completed-steper/Completed-steper";

import "./Bank-information.css";

const BankInformation = () => {
  const [isVerifyed, verify] = useState(false);
  return (
    <div>
      <BlockHeader
        title="Payment information"
        handler={() => verify(false)}
      />
      {isVerifyed && <CompletedSetup />}
      {!isVerifyed && <CompletedSteper verify={verify} />}
    </div>
  );
};

export default BankInformation;
