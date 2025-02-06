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
    PASSWORD,
    SIGNUP,
    SIGNUP_DESCRIPTION,
    USERNAME,
    CONFIRM_PASSWORD
} from '@/models/constants/texts'
import { registerSchema } from './schemas'
import registerDefaultValues from './defaultValues'

export const SignupForm = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
    const { register } = useAuth();

    const form = useForm({
        mode: 'all',
        defaultValues: registerDefaultValues,
        resolver: zodResolver(registerSchema)
    })

    const registerKeys = registerSchema.innerType().keyof().Enum;

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        try {
            register(values.email, values.password, values.username)
        }
        catch (error) {
            console.log('Error in subnmit register form, the error is: ', error);
        }
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'>{SIGNUP}</CardTitle>
                    <CardDescription>
                        {SIGNUP_DESCRIPTION}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-6'>
                                <FormField
                                    control={form.control}
                                    name={registerKeys.email}
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
                                <FormField
                                    control={form.control}
                                    name={registerKeys.username}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{USERNAME}</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={registerKeys.password}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='flex items-center'>
                                                <FormLabel htmlFor='password'>{PASSWORD}</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Input type={'password'} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={registerKeys.confirmPassword}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='flex items-center'>
                                                <FormLabel htmlFor='password'>{CONFIRM_PASSWORD}</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Input type={'password'} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' className='w-full'>
                                    {SIGNUP}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignupForm