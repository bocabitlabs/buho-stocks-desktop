import { Steps } from "antd";
import React, { ReactElement, useState } from "react";

interface Props {
  item: any;
}

export default function SectorsStep({ item }: Props): ReactElement {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return <Steps.Step key={title} title={title} description={content} />;
}
