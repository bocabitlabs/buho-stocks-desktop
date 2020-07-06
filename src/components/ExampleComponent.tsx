import React from "react";

/**
 *
 * @param who: Who is this
 * @type who: string
 */
export const ExampleComponent = ({ who }: { who: string }) => {
  return <div>Hello this is {who}</div>;
};

/**
 *
 */
interface ExampleProps {
  /**
   * Who will be blabla
   */
  who: string;
  /**
   * Example of optional parameter
   */
  optionalParam?: string;
}

export const ExampleComponentWithType = ({
  who,
  optionalParam = ""
}: ExampleProps) => {
  return <div>Hello this is {who}</div>;
};
