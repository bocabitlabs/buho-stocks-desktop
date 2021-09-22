import { Steps } from "antd";
import React, {
  useEffect,
  useRef,
  useState
} from "react";
import { useTranslation } from "react-i18next";
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
}: Props): React.ReactElement {
  const myRef = useRef<HTMLDivElement>(null);
  const [importSteps, setImportSteps] = useState<any>([]);
  const { t } = useTranslation();

  useEffect(() => {
    let steps = [
      {
        id: 0,
        name: "start",
        title: t("Start")
      },
      {
        id: ImportIds.sectors,
        name: "sectors",
        title: t("Sectors"),
        content: t("Waiting")
      },
      {
        id: ImportIds.markets,
        name: "markets",
        title: t("Markets"),
        content: t("Waiting")
      },
      {
        id: ImportIds.currencies,
        name: "currencies",
        title: t("Currencies"),
        content: t("Waiting")
      },
      {
        id: ImportIds.portfolios,
        name: "portfolios",
        title: t("Portfolios"),
        content: t("Waiting")
      },
      {
        id: ImportIds.companies,
        name: "companies",
        title: t("Companies"),
        content: t("Waiting")
      },
      {
        id: ImportIds.shares,
        name: "shares",
        title: t("Shares transactions"),
        content: t("Waiting")
      },
      {
        id: ImportIds.rights,
        name: "rights",
        title: t("Rights transactions"),
        content: t("Waiting")
      },
      {
        id: ImportIds.dividends,
        name: "dividends",
        title: t("Dividends transactions"),
        content: t("Waiting")
      },
      {
        id: ImportIds.stockPrices,
        name: "stockPrices",
        title: t("Stock prices"),
        content: t("Waiting")
      },
      {
        id: 11,
        name: "completed",
        title: t("Done")
      }
    ];
    const newSteps = steps.filter((element) => {
      return [...stepsNames, "start", "completed"].includes(element.name);
    });
    setImportSteps(newSteps);
  }, [stepsNames]);

  useEffect(() => {
    const setStepAsFinished = () => {
      let stepToEdit = getStepPositionById();

      if (stepToEdit !== -1) {
        let updatedImportSteps = [...importSteps];
        updatedImportSteps[stepToEdit] = {
          ...updatedImportSteps[stepToEdit],
          content: importText
        };

        setImportSteps(updatedImportSteps);
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
    let foundIndex = importSteps.findIndex((x: any) => x.id === importStep);
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
