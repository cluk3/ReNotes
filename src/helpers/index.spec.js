import { createExcerptFromText, getDefaultNewFolderName } from './index';

describe('createExcerptFromText', () => {
  it('should get the excerpt from the second line', () => {
    expect(createExcerptFromText('title\nsecond line\nthird line')).toEqual(
      'second line'
    );
  });
  it('should get the excerpt from the second line', () => {
    expect(createExcerptFromText('title\nsecond line\nthird line')).toEqual(
      'second line'
    );
  });
  it('should ignore empty lines', () => {
    expect(createExcerptFromText('title\n\n\nexcerpt\nsecond line')).toEqual(
      'excerpt'
    );
  });
  it('should return default string when there is only one line', () => {
    expect(createExcerptFromText('title')).toEqual('No additional text');
  });
  it('should return default string when empty string', () => {
    expect(createExcerptFromText('')).toEqual('No additional text');
  });
});

describe('getDefaultNewFolderName', () => {
  it('should return "New Folder" when it is not in the list', () => {
    expect(getDefaultNewFolderName([])).toEqual('New Folder');
  });
  it('should return "New Folder 1" when "New Folder" is taken', () => {
    expect(getDefaultNewFolderName(['New Folder'])).toEqual('New Folder 1');
  });

  it('should return "New Folder 2" when "New Folder 1" is taken', () => {
    expect(
      getDefaultNewFolderName(['New Folder 3', 'New Folder', 'New Folder 1'])
    ).toEqual('New Folder 2');
  });
});
