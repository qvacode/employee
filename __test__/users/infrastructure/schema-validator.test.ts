import { UserSchemaValidator } from '../../../src/modules/users/infrastructure/http-api/user.schema-validator';
import { SchemaValidator } from '../../../src/common/infrastructure/schema-validator';

describe('User schema validations', () => {

    test('isUUID: debe lanzar una excepción para uuid no valido', () => {
        const uuid = 'asd.asd'

        expect(() => SchemaValidator.isUUID(uuid)).toThrow('"value" must be a valid GUID') 
    });

    test('isUUID: debe pasar la validación para un string uuid', () => {
        const uuid = '06ec30f9-e9c6-4ac7-a797-ffdb72e323f4'

        expect(() => SchemaValidator.isUUID(uuid)).not.toThrow() 
    });
    
});