import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { useAuth } from '@/hooks/useAuth'
import {
    EMAIL, 
    EMAIL_PLACEHOLDER, 
    LOGIN, 
    LOGIN_DESCRIPTION, 
    PASSWORD, 
    SIGNUP, 
    SIGNUP_OFFER
} from '@/models/constants/texts'
import { loginSchema } from './schema'
import loginDefaultValues from './defualtValues'

export const LoginForm = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
    const { login } = useAuth();

    const form = useForm({
        mode: 'all',
        defaultValues: loginDefaultValues,
        resolver: zodResolver(loginSchema)
    })

    const loginFormKeys = loginSchema.keyof().Enum;

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        try {
            login(values.email, values.password)
        }
        catch (error) {
            console.error('Error in subnmit login form, the error is: ', error);
        }
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'>{LOGIN}</CardTitle>
                    <CardDescription>
                        {LOGIN_DESCRIPTION}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-6'>
                                <FormField
                                    control={form.control}
                                    name={loginFormKeys.email}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{EMAIL}</FormLabel>
                                            <FormControl>
                                                <Input type='email' placeholder={EMAIL_PLACEHOLDER} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='grid gap-2'>
                                    <FormField
                                        control={form.control}
                                        name={loginFormKeys.password}
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='flex items-center'>
                                                    <FormLabel htmlFor='password'>{PASSWORD}</FormLabel>
                                                    {/* <a
                            href='#'
                            className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                          >
                            Forgot your password?
                          </a> */}
                                                </div>
                                                <FormControl>
                                                    <Input type='password' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type='submit' className='w-full'>
                                    {LOGIN}
                                </Button>
                                {/* <Button variant='outline' className='w-full'>
                                    Login with Google
                                </Button> */}
                            </div>
                            <div className='mt-4 text-center text-sm'>
                                {SIGNUP_OFFER}
                                <a href='/signup' className='underline underline-offset-4'>
                                    {SIGNUP}
                                </a>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm