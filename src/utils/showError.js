export default function showError(error, errorText) {
  if (error) {
    return errorText;
  } else {
    return false;
  }
}
