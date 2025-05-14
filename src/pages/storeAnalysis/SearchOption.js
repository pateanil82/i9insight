import React, { useContext, useState } from "react";
import { CardTitle, Col, Row, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { PreviewAltCard, PreviewCard } from "../../components/Component";
import OptionBlock from "./OptionBlock";
import { StoreAnalysisContext } from "./StoreAnalysisContext";

const SearchOption = () => {
  const { bucketAtt1, storeApiData, setClickedBlockValue, handleClickedBlock } = useContext(StoreAnalysisContext);

  const [checkedItems, setCheckedItems] = useState({});
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleCheckbox = (key, item) => {
    if (!checkedItems[key]) {
      setModalData({ key, item });
      setModalOpen(true);
    }

    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleModalClose = () => {
    if (modalData?.key) {
      setCheckedItems((prev) => ({
        ...prev,
        [modalData.key]: false,
      }));
    }
    setModalOpen(false);
    setModalData(null);
  };
  return (
    <>
      <Row className="mt-4">
        <Col md={12} className="mb-2">
          <h5 className="text-center">{bucketAtt1}</h5>
        </Col>
        {storeApiData?.Sale_Vs_Stocks?.map((item) => {
          const key = item.Bucket_01;
          return (
            <Col md={6} className="mb-2" key={key}>
              <PreviewAltCard>
                <div className="card-title-group align-start mb-2">
                  <CardTitle
                    className="card-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setClickedBlockValue(item.Bucket_01);
                      handleClickedBlock(item.Bucket_01);
                    }}
                  >
                    <span className="title fw-bold text-2">{item.Bucket_01}</span>
                  </CardTitle>
                </div>
                <OptionBlock item={item} isChecked={!!checkedItems[key]} onToggle={() => toggleCheckbox(key)} />
              </PreviewAltCard>
            </Col>
          );
        })}
      </Row>
      <Modal isOpen={modalOpen} toggle={handleModalClose}>
        <ModalHeader toggle={handleModalClose}>Item Details</ModalHeader>
        <ModalBody>
          {modalData && (
            <>
              <p>
                <strong>Bucket:</strong> {modalData.key}
              </p>

              {/* Add more fields as needed */}
            </>
          )}
          <Button color="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SearchOption;
