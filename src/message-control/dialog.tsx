const { electron } = window;
const { sendSync } = electron;

export const saveFile = (dataToSave: any) => {
  const result = sendSync("save-file", dataToSave);
  return result;
};
