import { Utility } from '../../src/common/utility';

describe('métodos de la clase de utilidad ', () => {
    const password = 'abc123';
    const hashedPassword = '$2a$10$ih1ptI7VaUnPc4OBwMGJF.lLXnnzLhcmXfJNw5zgmFOPmj8BNqs/S'

    test('generateId: debe retornar un uuid diferente para cada llamada', () => {
        const id1 = Utility.generateId();
        const id2 = Utility.generateId();

        expect(id1 === id2).toBeFalsy();
    });

    test('hashPassword: encriptar la contraseñan y retornar un string', async () => {
        const hashedPassword = await Utility.hashPassword(password);

        console.log('hash1', hashedPassword);

        expect(hashedPassword).not.toBe(password);
        expect(typeof hashedPassword).toBe('string');
    });

    test('validatePassword: debe retornar verdadero si la contraseña es correcta', async () => {
        const isValid = await Utility.validatePassword(password, hashedPassword);

        expect(isValid).toBeTruthy();
    });

    test('validatePassword: debe retornar falso si la contraseña es incorrecta', async () => {
        const isValid = await Utility.validatePassword(password, password);

        expect(isValid).toBeFalsy();
    });
});
