import sendAsync from "../message-control/renderer";

/**
 * Send a SQL async query, expecting a callback and an error
 *
 * @param sql: The SQL code that will be executed
 * @type sql: string
 * @param messageType: The type of the message to be expected. Depending on this parameter,
 *  the reply from electron will be of a different type so reponses won't be mixed up.
 * @type messageType: string
 * @param callback: The callback function that will be called once execution finishes
 * @type callback: Function
 * @param errorHandler: Function that will be called in case of an error.
 * @type errorHandler: Function
 */
export default function sendSqlWithCallback(
  sql: string,
  messageType: string,
  callback: Function,
  errorHandler: Function
) {
  sendAsync(sql, messageType)
    .then((result: React.SetStateAction<undefined>) => callback(result))
    .catch((error) => {
      errorHandler(error);
    });
}
