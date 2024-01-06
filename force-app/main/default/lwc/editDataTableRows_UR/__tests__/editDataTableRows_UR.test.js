import { createElement } from 'lwc';
import EditDataTableRows_UR from 'c/editDataTableRows_UR';

describe('c-edit-data-table-rows-ur', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-edit-data-table-rows-ur', {
            is: EditDataTableRows_UR
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});