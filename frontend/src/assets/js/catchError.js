export default function catchError (e) {
    let msg;
    // Enhanced error handling
    if (e.response) {
      // Server responded with a status code other than 2xx
      msg = `Error ${e.response.status}: ${e.response.data.message || "Server error"}`;
    } else if (e.request) {
      // Request was made but no response received
      msg = "No response received from server";
    } else {
      // Something else caused the error
      msg = ("Error: ", e.message)
    }
    console.error(msg);
    flash(msg, "Error");
}