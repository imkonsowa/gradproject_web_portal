<template>
    <v-app>
        <v-main>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                color="primary"
                                dark
                                flat
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        v-model="email"
                                        label="Login"
                                        name="login"
                                        prepend-icon="mdi-account"
                                        type="email"
                                        :error-messages="emailErrors"
                                        @input="$v.email.$touch()"
                                        @blur="$v.email.$touch()"
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="password"
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        :error-messages="passwordErrors"
                                        @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="login" :loading="posting">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import {email, required} from 'vuelidate/lib/validators'

    export default {
        name: 'login',
        layout: 'guest',
        validations: function () {
            return {
                email: {required, email},
                password: {required}
            }
        },
        data: () => ({
            posting: false,
            loginErrorMessage: '',
            email: '',
            password: ''
        }),
        computed: {
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) {
                    return errors
                }
                !this.$v.email.required && errors.push('Email is required!');
                return errors
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) {
                    return errors
                }
                !this.$v.password.required && errors.push('Password is required!');
                return errors
            }
        },
        methods: {
            async login() {
                this.$v.$touch();

                if (this.$v.$invalid) {
                    return false;
                }

                let data = null;

                this.posting = true;

                try {
                    await this.$axios.get(`${process.env.appUrl}sanctum/csrf-cookie`)
                        .then(async response => {
                            await this.$axios.post(`${process.env.appUrl}login`, {
                                email: this.email,
                                password: this.password
                            }).then(response => {
                                data = response.data;
                            }).catch(error => {
                                this.loginErrorMessage = error.response.status === 422 ? 'Invalid email or password' : 'Login failed, Please try again later';
                            }).finally(() => {
                                this.posting = false
                            })
                        })
                } catch (e) {
                    this.posting = false;
                    console.log(e)
                }

                if (!data) return false;

                await this.$store.dispatch('auth/fetchUser');

                this.$router.push({name: 'admin.employees'})

            }
        }
    }
</script>

<style scoped>

</style>
