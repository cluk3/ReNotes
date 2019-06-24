import isToday from 'date-fns/is_today';
import isYesterday from 'date-fns/is_yesterday';
import differenceInDays from 'date-fns/difference_in_days';
import format from 'date-fns/format';
import fp from 'lodash/fp';

const YESTERDAY = 'Yesterday';

export const getDefaultValue = folders => {
  const NEW_FOLDER = 'New Folder';
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

export const createExcerptFromText = fp.pipe(
  fp.split('\n'),
  fp.filter(fp.identity),
  fp.nth(1),
  fp.defaultTo('No additional text')
);

export const createTitleFromText = text => text.split('\n')[0] || 'New Note';

export const electNewElement = (elementIndex, list) => {
  if (list.length === 1) {
    // it was the last in the array
    return;
  }
  if (elementIndex === list.length - 1) {
    // it was in the last position
    return list[elementIndex - 1];
  }
  return list[elementIndex + 1];
};
