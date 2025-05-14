import React, { useContext } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { Block, PreviewCard } from "../../components/Component";
import FormContainer from "./FormContainer";
import StoreDetails from "./StoreDetails";
import StoreProfitability from "./StoreProfitability";
import SearchOption from "./SearchOption";
import BlockTable from "./BlockTable";
import { StoreAnalysisContext } from "./StoreAnalysisContext";
import './index.css'
const StoreAnalysis = () => {
  const { storeApiData } = useContext(StoreAnalysisContext);
  return (
    <>
      <Head title="Store Analysis"></Head>
      <Content>
        <Block>
          <PreviewCard>
            <FormContainer />
          </PreviewCard>
          {storeApiData ? (
            <>
              <PreviewCard>
                <StoreDetails />
              </PreviewCard>
              <PreviewCard>
                <StoreProfitability />
              </PreviewCard>
              {/* <PreviewCard> */}
              <SearchOption />
              {/* </PreviewCard> */}

              <PreviewCard>
                <BlockTable />
              </PreviewCard>
            </>
          ) : null}
        </Block>
      </Content>
    </>
  );
};

export default StoreAnalysis;
