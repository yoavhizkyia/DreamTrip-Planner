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
                    <div className="flex flex-col gap-6 mt-6">
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                        <Button variant="outline" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="curren    tColor"
                                />
                            </svg>
                            Login with Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignupForm