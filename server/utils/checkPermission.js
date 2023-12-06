const checkPermissonToChangeInfo = (decodedUser, requestId) => {
  if (decodedUser.id === requestId) return;
  if (decodedUser.role == "admin") return;
  throw Error("Do not have permisson");
};

const checkAdminRightPermission = (decodedUser) => {
  if (decodedUser.role === "admin") return;
  throw Error("Do not have permisson to change the user role");
};

module.exports = { checkPermissonToChangeInfo, checkAdminRightPermission };
