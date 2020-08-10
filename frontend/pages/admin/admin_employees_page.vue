<template>
    <v-card flat elevation="1">
        <v-card-text>
            <v-toolbar flat color="white">
                <v-toolbar-title>Employees Grid</v-toolbar-title>
                <v-divider class="mx-4" inset vertical/>
                <v-spacer/>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-on="on"
                        >New Employee
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ 'Employees' }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field
                                            prepend-icon="person"
                                            v-model="employee.name"
                                            label="Name"
                                            :error-messages="nameErrors"
                                            @blur="$v.employee.name.$touch()"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field
                                            prepend-icon="email"
                                            v-model="employee.email"
                                            label="Email"
                                            :error-messages="emailErrors"
                                            @blur="$v.employee.email.$touch()"
                                            @input="$v.employee.email.$touch()"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-file-input
                                            label="Cover"
                                            :error-messages="coverErrors"
                                            accept="image/*"
                                            @change="handleCover"
                                        />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save" :loading="posting">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>

            <v-simple-table id="employees-table" style="width: 100%">
                <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Cover</th>
                </tr>
                </thead>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import FormData from 'form-data'
    import {required, email} from 'vuelidate/lib/validators'
    import Cookies from 'js-cookie'
    import io from 'socket.io-client';


    export default {
        name: "admin_employees_page",
        layout: 'dashboard',
        mounted() {
            this.socketConnection = io('127.0.0.1:4300')

            this.employeesDatatable = $($('#employees-table').find('table')).DataTable({
                serverSide: true,
                processing: true,
                ajax: {
                    method: 'post',
                    url: `${process.env.apiUrl}/admin/employees/datatable`,
                    headers: {
                        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                },
                columns: [
                    {
                        name: 'name',
                        data: 'name',
                        searchable: true,
                        orderable: false
                    },
                    {
                        name: 'email',
                        data: 'email',
                        searchable: true,
                        orderable: false
                    },
                    {
                        name: 'cover',
                        data: 'cover',
                        searchable: true,
                        orderable: false
                    },

                ]
            })
        },
        data: () => ({
            dialog: false,
            employee: {
                name: '',
                cover: '',
                email: ''
            },
            posting: false,
            employeesDatatable: null,
            fileReader: new FileReader(),
            employees: []
        }),
        validations: {
            employee: {
                name: {required},
                email: {required, email},
                cover: {required}
            }
        },
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.employee.name.$dirty) {
                    return errors
                }
                !this.$v.employee.name.required && errors.push('Name is required')
                return errors;
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.employee.email.$dirty) {
                    return errors
                }
                !this.$v.employee.email.required && errors.push('Email is required')
                !this.$v.employee.email.email && errors.push('Not valid email')
                return errors;
            },
            coverErrors() {
                const errors = [];
                if (!this.$v.employee.cover.$dirty) {
                    return errors
                }
                !this.$v.employee.cover.required && errors.push('Cover is required')
                return errors;
            },
        },
        methods: {
            handleCover(file) {
                this.employee.cover = file

                this.$v.employee.cover.$touch()
            },
            async save() {
                this.$v.$touch();

                if (this.$v.$invalid) {
                    return false
                }

                let payload = new FormData();

                Object.keys(this.employee).map(key => {
                    payload.append(key, this.employee[key])
                })

                this.posting = true;

                await this.$axios.post('admin/employees', payload)
                    .then(async response => {
                        await this.employeesDatatable.ajax.reload();

                        this.dialog = false;

                        this.fileReader.readAsDataURL(this.employee.cover);

                        this.fileReader.onload = () => {
                            this.socketConnection.emit('process_employee_cover', {
                                snap: this.fileReader.result.replace('data:image/png;base64,', ''),
                                id: response.data.employee.id
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    }).finally(() => this.posting = false)
            }
        },
        watch: {
            dialog: function (newValue) {
                if (!newValue) {
                    this.$v.$reset()
                }
            }
        }
    }
</script>

<style scoped>

</style>
