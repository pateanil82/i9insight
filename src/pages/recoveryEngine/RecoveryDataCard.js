import React from "react";
import { CardTitle } from "reactstrap";
import { Icon, PreviewAltCard } from "../../components/Component";

const RecoveryDataCard = ({ title, subtitle1, value1, subtitle2, value2 }) => {
  return (
    <div className="border recovery-card">
      <div className="px-3 bg-primary recovery-card-title">
        <CardTitle>
          <h6 className="title">{title}</h6>
        </CardTitle>
      </div>
        <div className="border-bottom w-100 mb-2" />
      <div className="px-3 pb-2">
        <div className="nk-sale-data">
          <span>{subtitle1}:</span>
          <b className="d-inline">&nbsp;{value1}</b>
        </div>

        <div className="nk-sale-data mt-1">
          <span>{subtitle2}:</span>
          <b className="d-inline">&nbsp;{value2}</b>
        </div>
      </div>
    </div>
  );
};

export default RecoveryDataCard;
