export const getDefaultValue = folders => {
  const NEW_FOLDER = "New Folder";
  if (!folders.includes(NEW_FOLDER)) return NEW_FOLDER;

  const newFolders = folders.filter(folderName =>
    folderName.startsWith(NEW_FOLDER)
  );

  let i = 1,
    found = false,
    newFolderName;

  while (i <= newFolders.length && !found) {
    newFolderName = `${NEW_FOLDER} ${i}`;
    found = !folders.includes(newFolderName);
    i++;
  }
  return newFolderName;
};
