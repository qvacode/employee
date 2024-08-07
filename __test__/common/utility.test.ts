import { Utility } from '../../src/common/utility';

describe('métodos de la clase de utilidad ', () => {

    test('generateId: debe retornar un uuid diferente para cada llamada', () => {

        const id1 = Utility.generateId()
        const id2 = Utility.generateId()

        expect(id1 === id2).toBeFalsy()        
    });
    
});