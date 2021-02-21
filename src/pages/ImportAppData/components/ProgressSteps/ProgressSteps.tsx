import { Steps } from "antd";
import React, {
  ReactElement,
  useEffect,
  useRef,
  useState
} from "react";
import { ImportIds } from "../import-ids";

interface Props {
  importStep: number;
  importText: string;
  stepsNames: string[];
}

export default function ProgressSteps({
  importStep,
  importText,
  stepsNames
}: Props): ReactElement {
  const myRef = useRef<HTMLDivElement>(null);
  const [importSteps, setImportSteps] = useState<any>([]);

  useEffect(() => {
    let steps = [
      {
        id: 0,
        name: "start",
        title: "Start"
      },
      {
        id: ImportIds.sectors,
        name: "sectors",
        title: "Sectors",
        content: "Waiting"
      },
      {
        id: ImportIds.markets,
        name: "markets",
        title: "Markets",
        content: "Waiting"
      },
      {
        id: ImportIds.currencies,
        name: "currencies",
        title: "Currencies",
        content: "Waiting"
      },
      {
        id: ImportIds.portfolios,
        name: "portfolios",
        title: "Portfolios",
        content: "Waiting"
      },
      {
        id: ImportIds.companies,
        name: "companies",
        title: "Companies",
        content: "Waiting"
      },
      {
        id: ImportIds.shares,
        name: "shares",
        title: "Shares transactions",
        content: "Waiting"
      },
      {
        id: ImportIds.rights,
        name: "rights",
        title: "Rights transactions",
        content: "Waiting"
      },
      {
        id: ImportIds.dividends,
        name: "dividends",
        title: "Dividends transactions",
        content: "Waiting"
      },
      {
        id: ImportIds.inflations,
        name: "inflations",
        title: "Inflations",
        content: "Waiting"
      },
      {
        id: ImportIds.stockPrices,
        name: "stockPrices",
        title: "Stock prices",
        content: "Waiting"
      },
      {
        id: 11,
        name: "completed",
        title: "Done"
      }
    ];
    const newSteps = steps.filter((element) => {
      return [...stepsNames, "start", "completed"].includes(element.name);
    });
    console.log("newSteps", newSteps);
    setImportSteps(newSteps);
  }, [stepsNames]);

  useEffect(() => {
    const setStepAsFinished = () => {
      let stepToEdit = getStepPositionById();
      console.log("Update step as Finished: ", importStep, stepToEdit);

      if (stepToEdit !== -1) {
        let updatedImportSteps = [...importSteps];
        updatedImportSteps[stepToEdit] = {
          ...updatedImportSteps[stepToEdit],
          content: importText
        };

        setImportSteps(updatedImportSteps);
        console.log(updatedImportSteps);
      }
    };
    setStepAsFinished();

    if (myRef !== null && myRef.current !== null) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [importText]);

  const getStepPositionById = () => {
    console.log("Get step position by id: ", importStep);
    let foundIndex = importSteps.findIndex((x: any) => x.id === importStep);
    console.log(`Id ${importStep} found on index ${foundIndex}`);
    return foundIndex;
  };

  return (
    <div>
      <Steps direction="vertical" current={getStepPositionById()}>
        {importSteps.map((item: any) => (
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
