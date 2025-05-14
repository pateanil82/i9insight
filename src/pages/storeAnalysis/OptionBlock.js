import React from "react";
import { CardSubtitle, Col, Row } from "reactstrap";
import { HorizontalBarChart } from "../../components/partials/charts/default/Charts";
import { Knob } from "../../components/Component";
import { formatAmount } from "../../utils/Utils";

const OptionBlock = ({ item, isChecked, onToggle }) => {
  const amountData = {
    labels: ["Discount Sale Value", "Full Price Sale Value", "Sale Value as per MRP"],
    stacked: true,
    datasets: [
      {
        label: "Amount",
        data: [item.Sum_of_Discounted_Amt, item.Sum_of_Full_Price_sale_Amt, item.Total_Amount_as_per_MRP],
        backgroundColor: ["#0069FF", "#ff6a00", "#4ba808"],
        // barPercentage: 0.3,
        // categoryPercentage: 0.8,
      },
    ],
  };

  const qtyData = {
    labels: ["Discount Qty", "Full Price Qty", "Avg Bill Qty"],
    stacked: true,
    datasets: [
      {
        label: "Quantity",
        data: [item.Sum_of_Discounted_Price_sale_Qty, item.Sum_of_Full_Price_sale_Qty, item.Average_of_Billed_Qty],
        backgroundColor: ["#0069FF", "#ff6a00", "#4ba808"],
        // barPercentage: 0.3,
        // categoryPercentage: 0.8,
      },
    ],
  };

  const getMaxValue = (value) => {
    if (value <= 1) return 10;
    const power = Math.ceil(Math.log10(value));
    return Math.pow(10, power);
  };

  const generateDialData = (value, maxValue, color) => {
    return {
      labels: ["Value", "Remaining"],
      datasets: [
        {
          data: [value, maxValue - value],
          backgroundColor: [color, "#e5e5e5"],
          borderWidth: 0,
        },
      ],
    };
  };

  
  return (
    <React.Fragment>
      <Row>
        <Col md={6} className="border no-bdr-y no-bdr-l border-gray ">
          <ul className="nk-coin-ovwg-legends w-100  d-block mb-2">
            {amountData?.labels?.map((label, index) => (
              <li key={index}>
                <span
                  className="dot dot-lg sq"
                  style={{ background: amountData.datasets[0].backgroundColor[index] }}
                ></span>
                <span>
                  <b>{label}</b>: &nbsp;{formatAmount(amountData.datasets[0].data[index])}
                </span>
              </li>
            ))}
          </ul>
          <div className="nk-coin-ovwg">
            <div className="nk-coin-ovwg-ck card card-bordered">
              <HorizontalBarChart data={amountData} yScale={false} />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <ul className="nk-coin-ovwg-legends w-100  d-block mb-2">
            {qtyData?.labels?.map((label, index) => (
              <li key={index}>
                <span
                  className="dot dot-lg sq"
                  style={{ background: qtyData.datasets[0].backgroundColor[index] }}
                ></span>
                <span>
                  <b>{label}</b>: &nbsp;{qtyData.datasets[0].data[index]}
                </span>
              </li>
            ))}
          </ul>
          <div className="nk-coin-ovwg card card-bordered">
            <div className="nk-coin-ovwg-ck">
              <HorizontalBarChart data={qtyData} yScale={false} />{" "}
            </div>
          </div>
        </Col>
        <Col md={4} className="mt-2 border  border-gray p-1  d-flex flex-column align-center">
          <CardSubtitle className="text-center m-0">Inventory Turn</CardSubtitle>
          <Knob
            data={generateDialData(item.Inventory_Turn, getMaxValue(item.Inventory_Turn), "#0069FF")}
            type="half"
            centerText={item.Inventory_Turn}
            needleValue={getMaxValue(item.Inventory_Turn) -item.Inventory_Turn}
          />
        </Col>

        <Col md={4} className="mt-2 border  no-bdr-l border-gray p-1  d-flex flex-column align-center">
          <CardSubtitle className="text-center m-0">Stock Cover in Days</CardSubtitle>
          <Knob
            data={generateDialData(item.Stock_Cover_in_Days, getMaxValue(item.Stock_Cover_in_Days), "#ff6a00")}
            type="half"
            centerText={item.Stock_Cover_in_Days}
            needleValue={getMaxValue(item.Stock_Cover_in_Days) - item.Stock_Cover_in_Days}
          />
        </Col>

        <Col md={4} className="mt-2 border  no-bdr-l border-gray p-1 d-flex flex-column align-center">
          <CardSubtitle className="text-center m-0">Ave Stock Qty</CardSubtitle>
          <Knob
            data={generateDialData(item.Average_Stock_Qty, getMaxValue(item.Average_Stock_Qty), "#4ba808")}
            type="half"
            centerText={item.Average_Stock_Qty}
            needleValue={getMaxValue(item.Average_Stock_Qty) - item.Average_Stock_Qty}
          />
        </Col>
        <Col md={12} className="mt-2">
          <div className="custom-control custom-control-sm custom-checkbox custom-control-pro">
            <input
              type="checkbox"
              className="custom-control-input"
              name={item.Bucket_01}
              id={item.Bucket_01}
              checked={isChecked}
              onChange={onToggle}
            ></input>
            <label className="custom-control-label" for={item.Bucket_01} style={{ padding: "7px 18px 7px 38px" }}>
              Break in Block of 30 days
            </label>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OptionBlock;
