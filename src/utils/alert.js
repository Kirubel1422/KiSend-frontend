import Swal from "sweetalert2";

export const AlertSuccess = (message) => {
  Swal.fire({
    title: message,
    showConfirmButton: false,
    timer: 2000,
    icon: "success",
  });
};

export const AlertError = (message) => {
  Swal.fire({
    title: message,
    showConfirmButton: false,
    timer: 3000,
    icon: "error",
  });
};

export const AlertInfo = (message) => {
  Swal.fire({
    title: message,
    showConfirmButton: true,
    icon: "info",
  });
};
