import isToday from 'date-fns/is_today';
import isYesterday from 'date-fns/is_yesterday';
import differenceInDays from 'date-fns/difference_in_days';
import format from 'date-fns/format';

const YESTERDAY = 'Yesterday';

export const getDefaultNewFolderName = folderNames => {
  const NEW_FOLDER = 'New Folder';
  if (!folderNames.includes(NEW_FOLDER)) return NEW_FOLDER;

  const newFolders = folderNames.filter(folderName =>
    folderName.startsWith(NEW_FOLDER)
  );

  let i = 1,
    found = false,
    newFolderName;

  while (i <= newFolders.length && !found) {
    newFolderName = `${NEW_FOLDER} ${i}`;
    found = !newFolders.includes(newFolderName);
    i++;
  }
  return newFolderName;
};

const isMoreThanSixDayAgo = date => differenceInDays(Date.now(), date) > 6;

export const humanFriendlyDate = date => {
  const formatDate = format.bind(null, date);
  if (isToday(date)) {
    return formatDate('h:mm A');
  } else if (isYesterday(date)) {
    return YESTERDAY;
  } else if (!isMoreThanSixDayAgo(date)) {
    return formatDate('dddd');
  } else {
    return formatDate('DD/MM/YY');
  }
};

export const createExcerptFromText = (text = '') => {
  const lines = text.split('\n').filter(Boolean);

  return lines[1] || 'No additional text';
};

export const createTitleFromText = (text = '') =>
  text.split('\n')[0] || 'New Note';

export const electNewElement = (elementIndex, list) => {
  if (list.length === 1) {
    // it was the last in the array
    return null;
  }
  if (elementIndex === list.length - 1) {
    // it was in the last position
    return list[elementIndex - 1];
  }
  return list[elementIndex + 1];
};

export const isNoteEmpty = text => text.length === 0 || text === '\n';
