export const saveOwner = (
  owner
) => {
  localStorage.setItem(
    "owner",
    JSON.stringify(owner)
  );
};

export const getOwner = () => {
  const owner =
    localStorage.getItem(
      "owner"
    );

  return owner
    ? JSON.parse(owner)
    : null;
};

export const clearOwner = () => {
  localStorage.removeItem(
    "owner"
  );
};