describe('ReNotes', function() {
  it('Loads successfully', function() {
    cy.visit('/');
  });
  it('Creates a new Folder', function() {
    cy.contains('New Folder').click();
    cy.get('input').type('{enter}');
  });
  it('Creates a new Note', function() {
    cy.get('button[aria-label="Add new note"]').click();
    cy.contains('New Note');
    cy.get('button[aria-label="Delete Note or Folder"]').click();
  });
  xit('should do nothing if clicking delete when there are no notes', () => {
    cy.get('button[aria-label="Delete Note or Folder"]').click();
  });
});

describe('ReNotes', function() {
  it('Creates a new Note', function() {
    cy.visit('/');
    cy.get('button[aria-label="Add new note"]').click();
    cy.contains('New Note').should('exist');
  });
  it('write into the note', () => {
    cy.get('.ql-editor')
      .click()
      .type('Test Title\n\ntest excerpt');
    cy.contains('Test Title').should('exist');
    cy.contains('test excerpt').should('exist');
  });
});

describe('ReNotes', function() {
  it('Empty notes are deleted when not active', function() {
    cy.visit('/');
    cy.get('button[aria-label="Add new note"]').click();
    cy.contains('Titolo 1').click();
    cy.get('[data-testid^=Note').should(notes => {
      expect(notes).to.have.length(2);

      expect(notes[1]).to.contain('Titolo 1');
    });
  });
});

describe('ReNotes', function() {
  it('deletes all the folders', function() {
    cy.visit('/');
    cy.contains('Test Folder').click();
    cy.get('button[aria-label="Delete Note or Folder"]').click();
    cy.contains('Test Folder').click();
    cy.get('button[aria-label="Delete Note or Folder"]').click();
    cy.contains('Test Folder').should('not.exist');
  });

  it('creates a first New Folder', () => {
    cy.contains('New Folder').click();
    cy.get('input').type('Seh{enter}');
    cy.contains('Seh').should('exist');
  });
  it('creates a first New note', () => {
    cy.get('button[aria-label="Add new note"]').click();
    cy.contains('New Note').should('exist');
  });
});
