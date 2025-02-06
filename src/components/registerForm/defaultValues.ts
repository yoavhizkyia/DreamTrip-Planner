import { registerSchema } from './schemas';

const registerKeys = registerSchema.innerType().keyof().enum;

const registerDefaultValue = {
    [registerKeys.email]: '',
    [registerKeys.username]: '',
    [registerKeys.password]: '',
    [registerKeys.confirmPassword]: '',
}
export default registerDefaultValue;