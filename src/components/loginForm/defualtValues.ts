import { loginSchema } from './schema';

const loginFormKeys = loginSchema.keyof().Enum;

const loginDefaultValues = {
    [loginFormKeys.email]: '',
    [loginFormKeys.password]: '',
}
export default loginDefaultValues;