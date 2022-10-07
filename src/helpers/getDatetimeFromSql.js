import stringifyTime from "./stringifyTime.js";

/** Length of the literal "NULL" and its following ", ". */
const NULL_LENGTH = 6;
/** Length of the API key field, its enclosing quotes and following ", ". */
const API_KEY_LENGTH = 12;
/**
 * Size of the offset from the index of the literal "NULL" to the beginning
 * of the datetime string.
 * */
const TOTAL_OFFSET = NULL_LENGTH + API_KEY_LENGTH + 1; // +1 to avoid quote
/** Length of a datetime string of the form: YYYY-MM-DD HH-mm-ss. */
const DATETIME_LENGTH = 19;

/**
 * Extracts and parses the datetime string from the given SQL query using the
 * `stringifyTime` function.
 * 
 * @param {string} sql SQL query to extract datetime from
 * 
 * @returns {object} date and time from the SQL query
 */
export default function getDatetimeFromSql(sql) {
    let index = sql.indexOf("NULL");
    let time = sql.substring(index + TOTAL_OFFSET, index + TOTAL_OFFSET + DATETIME_LENGTH);
    return stringifyTime(time);
}
