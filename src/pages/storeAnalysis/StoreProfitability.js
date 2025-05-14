import React, { useContext, useMemo } from "react";
import { Block, BlockHead, BlockTitle } from "../../components/Component";
import { HorizontalBarChart } from "../../components/partials/charts/default/Charts";
import { StoreAnalysisContext } from "./StoreAnalysisContext";

const generateDarkColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    // Generate HSL with low lightness for dark colors
    const hue = Math.floor(Math.random() * 360);
    const saturation = 55 + Math.random() * 10; // 85–95% for vibrancy
    const lightness = 70 + Math.random() * 10; // 35–45% for dark tones
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};

const StoreProfitability = () => {
  const { storeApiData } = useContext(StoreAnalysisContext);

  const labels = useMemo(
    () => storeApiData?.Hierarchical_Profitability.map((item) => Object.keys(item)[0]),
    [storeApiData]
  );
  const values = useMemo(
    () => storeApiData?.Hierarchical_Profitability.map((item) => Object.values(item)[0]),
    [storeApiData]
  );
  const backgroundColors = useMemo(() => generateDarkColors(values?.length || 0), [values]);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Values",
          data: values,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    }),
    [labels, values, backgroundColors]
  );

  return (
    <div className="card-inner">
      <Block>
        <BlockHead>
          <BlockTitle tag="h5">Store Profitability compare to other region</BlockTitle>
        </BlockHead>
        <ul
          className="nk-coin-ovwg-legends w-100 d-flex flex-column flex-md-row justify-center mb-2"
          style={{ gap: "5px" }}
        >
          {data?.labels?.map((label, index) => (
            <li key={index}>
              <span className="dot dot-lg sq" style={{ background: data.datasets[0].backgroundColor[index] }}></span>
              <span>
                <b>{label}</b>: &nbsp;{data.datasets[0].data[index]}%
              </span>
            </li>
          ))}
        </ul>
        <div className="nk-coin-ovwg">
          <div className="nk-coin-ovwg-ck">
            <HorizontalBarChart data={data} yScale={true} datalabelsDisplay={true} />
          </div>
        </div>
      </Block>
    </div>
  );
};

export default StoreProfitability;
