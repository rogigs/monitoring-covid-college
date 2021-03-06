import styled from "styled-components";
import media from "~/css/styledMedias";
import DESIGN_SYSTEM from "~/css/designSystem";

export const Box = styled.div`
  .title {
    text-align: center;
    margin-bottom: ${DESIGN_SYSTEM.spaces.spaceSm};
  }

  ${media.greaterThan("tablet")`
      display: flex;
      justify-content: center;
      align-items: center;
    
  
      .container {
        width: 50%;
      }
  `}
`;

export const WrapperField = styled.div`
  margin-bottom: ${DESIGN_SYSTEM.spaces.spaceSm};
  margin-top: ${DESIGN_SYSTEM.spaces.spaceSm};
`;

export const WrapperTopButton = styled.div`
  margin-bottom: ${DESIGN_SYSTEM.spaces.spaceSm};
  display: flex;
  justify-content: end;

  ${media.greaterThan("tablet")`
    button {
      width: 35%;
    }
      
  `}
`;

export const WrapperButton = styled.div`
  .reset {
    margin-top: ${DESIGN_SYSTEM.spaces.spaceSm};
  }

  ${media.greaterThan("tablet")`
      margin: 0 auto;
      width: 50%;
  `}
`;

export const WrapperChart = styled.div``;
