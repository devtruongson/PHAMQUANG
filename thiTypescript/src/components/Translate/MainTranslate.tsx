import React, { useState } from "react";
import Add from "../../admin/add";

const MainTranslate = () => {
  const [checkTranslate, setCheckTranslate] = useState(false);
  const [textTranslate, setTextTranslate] = useState("");
  const handelTranslateShow = () => {
    setCheckTranslate(true);
  };
  const handelTranslateHide = () => {
    setCheckTranslate(false);
  };
  const getTextTranslate = (text: string) => {
    setTextTranslate(text);
  };

  return (
    <div>
      <Add
        handelTranslateShow={handelTranslateShow}
        handelTranslateHide={handelTranslateHide}
        getTextTranslate={getTextTranslate}
      />
    </div>
  );
};

export default MainTranslate;
