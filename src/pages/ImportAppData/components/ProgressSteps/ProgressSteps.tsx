import { Steps } from "antd";
import React, { ReactElement, useEffect, useRef, useState } from "react";

interface Props {
  importStep: number;
}

export default function ProgressSteps({ importStep }: Props): ReactElement {
  const myRef = useRef<HTMLDivElement>(null);
  let steps = [
    {
      id: 0,
      title: "Running",
      content: "Importing sectors"
    },
    {
      id: 1,
      title: "Waiting",
      content: "Importing markets"
    },
    {
      id: 2,
      title: "Waiting",
      content: "Importing currencies"
    },
    {
      id: 3,
      title: "Waiting",
      content: "Importing portfolios"
    },
    {
      id: 4,
      title: "Waiting",
      content: "Importing companies"
    },
    {
      id: 5,
      title: "Waiting",
      content: "Importing Shares transactions"
    },
    {
      id: 6,
      title: "Waiting",
      content: "Importing Rights transactions"
    },
    {
      id: 7,
      title: "Waiting",
      content: "Importing Dividends transactions"
    },
    {
      id: 8,
      title: "Waiting",
      content: "Importing Inflations"
    }
  ];
  const [importSteps, setImportSteps] = useState(steps);

  useEffect(() => {
    const setStepAsFinished = (stepNumber: number) => {
      let updatedImportSteps = [...importSteps];
      updatedImportSteps[stepNumber] = {
        ...updatedImportSteps[stepNumber],
        title: "Finished"
      };
      setImportSteps(updatedImportSteps);
      console.log(updatedImportSteps);
    };
    if(importStep< importSteps.length){
      setStepAsFinished(importStep);
    }

    if (myRef !== null && myRef.current !== null) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [importStep]);

  return (
    <div>
      <Steps direction="vertical" current={importStep}>
        {importSteps.map((item) => (
          <Steps.Step
            key={item.title}
            title={item.title}
            description={item.content}
          />
        ))}
      </Steps>
      <div ref={myRef}></div>
    </div>
  );
}
